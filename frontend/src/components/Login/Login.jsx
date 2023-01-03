import { CONFIG } from "../../config";
import { AuthProvider } from "@asgardeo/auth-react";
import { LoginAsgardeo } from './LoginAsgardeo';

const config = {
     signInRedirectURL: CONFIG.SIGN_IN_REDIRECT_URL,
     signOutRedirectURL: CONFIG.SIGN_OUT_REDIRECT_URL,
     clientID: CONFIG.CLIENTID,
     baseUrl: CONFIG.BASE_URL,
     scope: [ CONFIG.SCOPE ]
};

export function  Login() {
     let Component = LoginAsgardeo
     return (
          <AuthProvider config={config}>
               <Component />
          </AuthProvider>
     );
};
