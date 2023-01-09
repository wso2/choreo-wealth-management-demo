import React, {useEffect, useState} from 'react';
import AccountData from "../../../data/AccountData.json";
import {Button} from "react-bootstrap";
import {getAccounts} from "../../../services/account-transaction-service";
import {CONSTANTS} from "../../../services/utils";
import { SkeletonAccount } from './SkeletonAccount';
import { useNavigate } from "react-router-dom";
import { AccountCard } from './AccountCard';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export const AccountListView = () => {

  const navigate = useNavigate();
  
  const [accounts, setAccounts] = useState(AccountData);
  const [loading, setLoading] = useState(false);
  const [isNewBankAvailable, setIsNewBankAvailable] = useState(true);

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
    <div className="row account-details-container justify-content-between mb-4">
      
      <div className={"col-sm-12 " + (isNewBankAvailable ? "col-md-10" : "")}>
        <OwlCarousel className='owl-theme' margin={10} loop nav>
          {accounts.map((account, id) => (<AccountCard itemId={id} key={id} account={account}/>))}
        </OwlCarousel>
      </div>
      
      {isNewBankAvailable &&
          <div className="add-account-button-wrapper col-sm-12 col-md-2">
            <Button
                onClick={navigateToBankPage}
                className="add-account-button align-items-center justify-content-center"
            >
              <i className="fi fi-rr-add"/>
              <p> Add a new account</p>
            </Button>
          </div>
      }
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
