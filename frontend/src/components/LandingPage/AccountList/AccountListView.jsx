import React, {useEffect, useState} from 'react'
import '../../../css/LandingPage.css'
import AccountData from "../../../data/AccountData.json";
import {Button} from "react-bootstrap";
import {getAccounts} from "../../../services/account-transaction-service";
import {CONSTANTS} from "../../../services/utils";
import { SkeletonAccount } from './SkeletonAccount';
import {useNavigate} from "react-router-dom";
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { AccountCard } from './AccountCard';

export const AccountListView = () => {

  const navigate = useNavigate();
  
  const [accounts, setAccounts] = useState(AccountData);
  const [loading, setLoading] = useState(false);
  const [isNewBankAvailable, setIsNewBankAvailable] = useState(false);

  useEffect(() => {
    // get user access token to session storage
    const user_access_token = sessionStorage.getItem(CONSTANTS.user_access_token);
    if (user_access_token) {
      setLoading(true);

      getAccounts(user_access_token).then(resp => {
        console.log("fetching accounts data")
        resp.data.Data.Account.map(account => {
          // todo: remove below if else block
          if (account.AccountId === "30080012343456") {
            account.Nickname = "Personal Account - Contoso Investment";
          } else if (account.AccountId === "15687012313256") {
            account.Nickname = "Joint Account - Contoso Investment";
          }

          accounts.push(account)
        })
        setLoading(false);
      }).catch(err => console.log(err));
    }
  }, [accounts])

  const navigateToBankPage = () => {
    navigate('/banks');
  }

  return(
    <div className = "container-md home-container p-0">
      <div className="row">
        <ScrollMenu>
          {accounts.map((account, id) => (<AccountCard itemId={id} key={id} account={account}/>))}
          
          {loading && loadAccountsSkeletons()}

          {isNewBankAvailable && 
            <div className="col ps-2">
              <div className="account-list-button" style={{width: "228px"}}>
                <div className="p-4 add-bank-div">
                  <i className="bi bi-plus-square plus-icon" onClick={navigateToBankPage}></i><br />
                  <Button onClick={navigateToBankPage} className="new-bank-button">Add a new bank</Button>
                </div>
              </div>
            </div> 
          }
        </ScrollMenu>
      </div>
    </div>
  )
}

const loadAccountsSkeletons = () => {
    return (
      <div style={{width: "228px"}}>
        <SkeletonAccount />
      </div>
    )
}
