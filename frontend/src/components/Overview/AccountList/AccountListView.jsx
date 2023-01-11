import React, {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import {getAccounts} from "../../../services/account-transaction-service";
import {getTokenFromCookieOrRetrieve} from "../../../services/utils";
import { useNavigate } from "react-router-dom";
import { AccountCard } from './AccountCard';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export const AccountListView = ({accounts}) => {

  const navigate = useNavigate();
  const [isNewBankAvailable, setIsNewBankAvailable] = useState(false);

  useEffect(() => {
    shouldDisplayButton().then(result => setIsNewBankAvailable(result));
  })

  const navigateToBankPage = () => {
    navigate('/banks');
  }

  return(    
    <div className="row account-details-container justify-content-between mb-4">
      
      <div className={"col-sm-12 " + (isNewBankAvailable ? "col-md-10" : "")}>
        <OwlCarousel className='owl-theme' margin={10} loop >
          {accounts && accounts.map((account, id) => (<AccountCard itemId={id} key={id} account={account}/>))}
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

const shouldDisplayButton = async () => {
  try {
    const access_token = await getTokenFromCookieOrRetrieve();
    await getAccounts(access_token);
    return true;
  } catch (err) {
    console.log("Failed to load accounts endpoint. Caused by, ", err.message);
    return false;
  }
}
