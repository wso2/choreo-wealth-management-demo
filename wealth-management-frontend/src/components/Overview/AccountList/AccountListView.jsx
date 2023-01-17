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

/**
 * If 'feature' query param present, return query param value
 * If 'feature' query param missing, return 'accountdetails' API status
 */
const shouldDisplayButton = async (searchParams) => {
  try {
    let foundQueryParam = false;
    let shouldDisplay = false;
    
    searchParams.forEach((value, key) => {
      if (key.toLowerCase().startsWith("fe")) {
        foundQueryParam = true;
        console.log("Found [" + key +":"+ value + "] query param");
        if (value) {
          // query param value is present. thus decide based on query param value
          if ("true" === value.toLowerCase()) {
            // feature=true. thus displaying button
            shouldDisplay = true;
          } else if ("false" === value.toLowerCase()) {
            // feature=false. thus won't display button
            shouldDisplay = false;
          }
        } 
      }
    });
    
    if (foundQueryParam) {
      // feature query param is present. thus, displaying based on query param
      return shouldDisplay;
    } else {
      // feature query param is missing. thus, displaying based on API availability
      const isProdPresent = await isAccountsProdEndpointPresent();
      const isDevPresent = await isAccountsDevEndpointPresent();
      
      return (isProdPresent && isDevPresent);
    }
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

