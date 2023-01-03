import '../../css/Login.css'
import profile from "../../images/profile.png";
import email from "../../images/email.png";
import pass from "../../images/pass.png";
//import { useNavigate } from "react-router-dom";
import React, { useState } from "react";





export function  LoginPage() {
//const navigate = useNavigate();

const [errorMessages, setErrorMessages] = useState({});
const errors = {
  uname: "invalid username",
  pass: "invalid password"
};
const handleSubmit = (event) => {

            const database = [
                  {
                    username: "sachinisiriwardene@gmail.com",
                    password: "Sach12345"
                  }
                ];
           //Prevent page reload
           event.preventDefault();

           var uname = document.getElementById("userName").value;
           var password = document.getElementById("pass").value;


           // Find user login info
           const userData = database.find((user) => user.username === uname);

           // Compare user info
           if (userData) {
             if (userData.password !== password) {
               // Invalid password
               setErrorMessages({ name: "pass", message: errors.pass });
             }else {
              // navigate("/dashboard");
             }

            } else {
             // Username not found
             setErrorMessages({ name: "uname", message: errors.uname });
           }
};
const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );
return (
      <form onSubmit={handleSubmit}>
      <div className="main">
        <div className="sub-main">
            <div>
                <div className="imgs">
                  <div className="container-image">
                    <img src={profile} alt="profile" className="profile"/>
                  </div>
                </div>
            <div>
            <div className="second-input">
                <img src={email} alt="email" className="email"/>
                    <input type="text" id="userName" name="uname" placeholder="user name" className="name"/>
                    {renderErrorMessage("uname")}

            </div>
            <div className="second-input">
                <img src={pass} alt="pass" className="email"/>
                   <input type="password" id="pass"  name="pass" placeholder="password" className="name"/>
                   {renderErrorMessage("pass")}

            </div>
            <div className="login-button">
                <input type="submit" value="Login" className="button"/>

            </div>
        </div>
      </div>

      </div>
    </div>
    </form>
);
};
