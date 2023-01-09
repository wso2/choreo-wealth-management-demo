import React from "react";
import { Routes ,Route } from 'react-router-dom';
import { Callback } from "./services/oauth2-service";
import { Banks } from './components/BankPage';
import { Login } from './components/Login/Login';
import { Logout } from "./components/Logout/Logout";
import {Dashboard} from "./layouts/Dashboard";

function App() {
 return (
    <div>
        <Routes>
            <Route path="/" element={ <Login/> } />
            <Route path="/login" element={ <Login/> } />
            <Route path="/dashboard" element={ <Dashboard/>} />
            <Route path="/oauth2/callback" element={ <Callback/> } />
            <Route path="/banks" element={ <Banks/> } />
            <Route path="/logout" element={ <Logout/> } />
        </Routes>
    </div>
  );
}

export default App;
