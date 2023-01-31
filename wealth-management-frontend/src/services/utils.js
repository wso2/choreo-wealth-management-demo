import {Buffer} from 'buffer';
import { getAppAccessToken } from './token-service';
import { APP_CONFIG } from '../config'; 

export const getBasicAuthHeader = (username, secret) => {
    return "Basic " + Buffer.from(username + ":" + secret).toString("base64");
}

export const CONSTANTS = {
    app_access_token: "APP_ACCESS_TOKEN",
    user_access_token: "USER_ACCESS_TOKEN",
    is_bank_added: "BANK_ADDED",
    redirect_response: "REDIRECT_RESPONSE",
    accounts: "ACCOUNTS",
}

export const loadBankLogo = (bankName) => {
  if (!bankName) {
    return APP_CONFIG.BANKS.DEFAULT.LOGO;
  }
  
  if (bankName.includes(APP_CONFIG.BANKS.FIRST.NAME)) {
    return APP_CONFIG.BANKS.FIRST.LOGO;
  } else if (bankName.includes(APP_CONFIG.BANKS.SECOND.NAME)) {
    return APP_CONFIG.BANKS.SECOND.LOGO;
  } else if (bankName.includes(APP_CONFIG.BANKS.THIRD.NAME)) {
    return APP_CONFIG.BANKS.THIRD.LOGO;
  }  else {
    return APP_CONFIG.BANKS.DEFAULT.LOGO;
  }
}


export const getCookie = (key) => {
  const name = `${key}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
      }
  }
  return '';
};

export const setCookie = (
  name,
  value,
  validityPeriod,
  path = '/',
  secured = true,
) => {
  let expiresDirective = '';
  const securedDirective = secured ? '; Secure' : '';
  if (validityPeriod) {
      const date = new Date();
      if (validityPeriod < 0) {
          date.setTime(date.getTime() + 1000000000000);
      } else {
          date.setTime((date.getTime() + validityPeriod * 1000));
      }
      expiresDirective = '; expires=' + date.toUTCString();
  }

  document.cookie = `${name}=${value}; path=${path}${expiresDirective}${securedDirective}`;
}

export const getTokenFromCookieOrRetrieve = async () => {
  // generate application access token
  let app_access_token = getCookie(CONSTANTS.app_access_token);
  try {
      if (!app_access_token) {

          const tokenResponse = await getAppAccessToken();
          app_access_token = tokenResponse.data.access_token;

          // add application access token to session storage
          setCookie(CONSTANTS.app_access_token, tokenResponse.data.access_token, tokenResponse.data.expires_in);
          console.log("application access token generated");
      }
  } catch (error) {
      console.log("Failed to generate app access token. Caused by ", error);
  }
  return app_access_token;
}
