import {Buffer} from 'buffer';

export const getBasicAuthHeader = (username, secret) => {
    return "Basic " + Buffer.from(username + ":" + secret).toString("base64");
}

export const CONSTANTS = {
    app_access_token: "APP_ACCESS_TOKEN",
    user_access_token: "USER_ACCESS_TOKEN",
    added_banks: "ADDED_BANKS",
    new_banks: "NEW_BANKS",
    redirect_response: "REDIRECT_RESPONSE"
}

export const loadImage = (data) => {

  const displayName = data?.DisplayName;
  if (displayName.includes("New Civil Bank")) {
    return "/bank_logos/NewCivilBank.svg";
  } else if (displayName.includes("Absolute Bank")) {
    return "/bank_logos/AbsoluteBank.svg";
  } else if (displayName.includes("Free Citizen Bank")) {
    return "/bank_logos/FreeCitizenBank.svg";
  } else if (displayName.includes("Goldcorp Bank")) {
    return "/bank_logos/GoldcorpBank.svg";
  } else if (displayName.includes("Citizens First Bank")) {
    return "/bank_logos/CitizensFirstBank.svg";
  } else if (displayName.includes("Royal Crown Trust")) {
    return "/bank_logos/RoyalCrownTrust.svg";
  } else {
    return "/favicon.svg";
  }
}

export const loadBankLogoByNickName = (bankNickName) => {
  if (bankNickName.includes("Contoso Retail")) {
    return "/bank_logos/ContosoRetailBank.svg";
  } else if (bankNickName.includes("Contoso SME")) {
    return "/bank_logos/ContosoSMEBank.svg";
  } else if (bankNickName.includes("Contoso Corporate")) {
    return "/bank_logos/ContosoCorpBank.svg";
  }  else {
    return "/bank_logos/ContosoInvestment.svg";
  }
}
