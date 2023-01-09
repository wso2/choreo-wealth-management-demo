import React from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {AccountListView} from "./AccountList/AccountListView";
import {Col, Row} from "react-bootstrap";
import {TransactionListView} from "./TransactionList/TransactionListView";
import {ExpenseView} from "./ExpenseView/ExpenseView";
import {Footer} from "../common/Footer";

export const Overview = () => {
    return (
        <>
            <ProfileInfo/>
            <AccountListView />
            <Row className="mb-4">
                <Col lg={7}><TransactionListView/></Col>
                <Col lg={5}><ExpenseView/></Col>
            </Row>
        </>
    )
}