import React from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {AccountListView} from "./AccountList/AccountListView";
import {Col, Row} from "react-bootstrap";
import {TransactionListView} from "./TransactionList/TransactionListView";
import {ExpenseView} from "./ExpenseView/ExpenseView";
import { useState, useEffect } from "react";
import { getAddedBanks } from '../../services/banks-service';
import { getAccounts, getInitialAccounts, getTransactions } from '../../services/account-transaction-service';
import { CONSTANTS, getTokenFromCookieOrRetrieve } from '../../services/utils';

export const Overview = () => {
    
    const [transactions, ] = useState([]);
    const [accounts, ] = useState([]);
    const [banks, ] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        // loading initial app data
        getTokenFromCookieOrRetrieve().then(access_token => {
            populateAppData(access_token);
        });
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accounts, banks, transactions])

    const populateAppData = async (access_token) => {
        
        setLoading(true);
        
        const isBankAdded = sessionStorage.getItem(CONSTANTS.is_bank_added);

        if (isBankAdded) {
            console.log("Found new bank !");
            const bankData = await fetchBanks(access_token);
            for await (let bank of bankData) {
                upsertBanks(bank);
                let accountData = await fetchAccounts(access_token, bank.Name.split(" ")[1]);
                for await (let account of accountData) {
                    account.BankName = bank.Name;
                    account.BankCountry = bank.Country;
                    upsertAccounts(account);
                    let tranData = account.Transactions;
                    for await (let tran of tranData) {
                        tran.BankName = bank.Name;
                        upsertTransactions(tran);
                    }
                }
                
                if (bankData.indexOf(bank) === (bankData.length-1)) {
                    setLoading(false);
                }
            }
        } else {
            console.log("Loading initial app data !");
            populateInitialAppData(access_token);
        }
    }

    const populateInitialAppData = async (access_token) => {
        let accountData = await fetchInitialAccounts(access_token);

        for await (let account of accountData) {
            account.BankName = "Contoso Investment Bank";
            account.BankCountry = "Wales";
            upsertAccounts(account);
            let tranData = await fetchTransactions(access_token, account.AccountId);

            for await (let tran of tranData) {
                tran.BankName = "Contoso Investment Bank";
                upsertTransactions(tran);
            }
            
            if (accountData.indexOf(account) === (accountData.length-1)) {
                setLoading(false);
            }
        }
    } 

    const fetchBanks = async (access_token) => {
        try {
            const banksResp = await getAddedBanks(access_token);
            return banksResp.data;
        } catch (error) {
            console.log("Failed to load banks for transactions. Caused by, ", error);
            return [];
        }
    }

    const fetchAccounts = async (access_token, bank_name) => {
        try {
            const accResp = await getAccounts(access_token, bank_name);
            return accResp.data;
        } catch (error) {
            console.log("Failed to load accounts for transactions. Caused by, ", error);
            return [];
        }
    }

    const fetchInitialAccounts = async (access_token, bank_name) => {
        try {
            const resp = await getInitialAccounts(access_token);
            return resp.data;
        } catch (err) {
            console.log("Failed to load initial accounts for transactions. Caused by, ", err);
            return [];
        }
    }

    const fetchTransactions = async (access_token, account_id) => {
        try {
            const accResp = await getTransactions(access_token, account_id);
            return accResp.data;
        } catch (error) {
            console.log("Failed to load transactions. Caused by, ", error);
            return [];
        }
    }

    const upsertAccounts = (account) => {
        const index = accounts.findIndex(_account => _account.AccountId === account.AccountId);
        upsert(accounts, account, index);
    }

    const upsertTransactions = (transaction) => {
        const index = transactions.findIndex(_tran => _tran.TransactionId === transaction.TransactionId);
        upsert(transactions, transaction, index);
    }

    const upsertBanks = (bank) => {
        const index = banks.findIndex(_bank => _bank.BankID === bank.BankID);
        upsert(banks, bank, index);
    }

    const upsert = (array, element, index) => {
        if (index > -1) array[index] = element;
        else array.push(element);
    }

    if (!loading) {
        return (
            <>
                <ProfileInfo accounts={accounts}/>
                <AccountListView accounts={accounts}/>
                <Row className="mb-4">
                    <Col lg={7}><TransactionListView transactions={transactions}/></Col>
                    <Col lg={5}><ExpenseView transactions={transactions}/></Col>
                </Row>
            </>
        )
    } else {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary" role="status" 
                    style={{"width": "3rem", "height": "3rem"}}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }
}
