import { CONFIG } from "../../config";
import { AuthProvider } from "@asgardeo/auth-react";
import { LoginAsgardeo } from './LoginAsgardeo';

const config = {
     signInRedirectURL: CONFIG.SIGN_IN_REDIRECT_URL,
     signOutRedirectURL: CONFIG.SIGN_OUT_REDIRECT_URL,
     clientID: CONFIG.ASGARDEO_APP_CONSUMER_KEY,
     baseUrl: CONFIG.ASGARDEO_BASE_URL,
     scope: [ CONFIG.SCOPE ]
};

export function  Login() {
     return (
          <AuthProvider config={config}>
               <LoginAsgardeo />
          </AuthProvider>
     );
};
