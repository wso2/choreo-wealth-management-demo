import React, {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import {getAccounts, getDevAccounts} from "../../../services/account-transaction-service";
import {getTokenFromCookieOrRetrieve} from "../../../services/utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AccountCard } from './AccountCard';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export const AccountListView = ({accounts}) => {

  const navigate = useNavigate();
  const [searchParams, ] = useSearchParams();
  const [isNewBankAvailable, setIsNewBankAvailable] = useState(false);

  useEffect(() => {
    shouldDisplayButton(searchParams).then(result => setIsNewBankAvailable(result));
  })

  const navigateToBankPage = () => {
    navigate('/banks');
  }

  return(    
    <div className="row account-details-container justify-content-between mb-4">
      
      <div className={"col-sm-12 " + (isNewBankAvailable ? "col-md-10" : "")}>
        <OwlCarousel className='owl-theme' margin={10} >
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

const shouldDisplayButton = async (searchParams) => {
  try {
    const isProdPresent = await isAccountsProdEndpointPresent();
    const isDevPresent = await isAccountsDevEndpointPresent();
    const isFlagPresent = isFeatureFlagPresent(searchParams);

    return ((isProdPresent && isDevPresent) || isFlagPresent);
  } catch (err) {
    console.log("Failed to load accounts endpoint. Caused by, ", err.message);
    return false;
  }
}

const isAccountsProdEndpointPresent = async () => {
  try {
    const access_token = await getTokenFromCookieOrRetrieve();
    await getAccounts(access_token, "Investment");
    return true;
  } catch (err) {
    console.log("Failed to load prod accounts endpoint. Caused by, ", err.message);
    return false;
  }
}

const isAccountsDevEndpointPresent = async () => {
  try {
    const access_token = await getTokenFromCookieOrRetrieve();
    await getDevAccounts(access_token, "Investment");
    return true;
  } catch (err) {
    console.log("Failed to load dev accounts endpoint. Caused by, ", err.message);
    return false;
  }
}

const isFeatureFlagPresent = (searchParams) => {
  // read feature flag to manually display button
  let found = false;
  searchParams.forEach((value, key) => {
    if (key.toLowerCase().startsWith("fe")) {
      console.log("Found " + key + " query param");
      found = true;
    }
  });
  return found;
}
