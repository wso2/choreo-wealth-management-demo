import React from "react";
import { Routes ,Route } from 'react-router-dom';
import { Callback } from "./services/oauth2-service";
import { Login } from './components/Login/Login';
import { Logout } from "./components/Logout/Logout";
import { Dashboard } from "./layouts/Dashboard";
import { BanksLayout } from "./layouts/Banks";
import { Toast } from 'bootstrap';

function App() {
 
  const toastElList = document.querySelectorAll('.toast')
  const toastList = [...toastElList].map(toastEl => Toast(toastEl));
  toastList.forEach(toast => toast.show());
 
  return (
    <div>
        <Routes>
            <Route path="/" element={ <Login/> } />
            <Route path="/login" element={ <Login/> } />
            <Route path="/dashboard" element={ <Dashboard/>} />
            <Route path="/oauth2/callback" element={ <Callback/> } />
            <Route path="/banks" element={ <BanksLayout/> } />
            <Route path="/logout" element={ <Logout/> } />
        </Routes>
    </div>
  );
}

export default App;
