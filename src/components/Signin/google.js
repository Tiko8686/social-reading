// import React from 'react';
// import ReactDOM from 'react-dom';


// import { GoogleLogin } from 'react-google-login';


// const responseGoogle = (response) => {
//   console.log(response);
// }

// ReactDOM.render(
//   <GoogleLogin
//     clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
//     buttonText="Login"
//     onSuccess={responseGoogle}
//     onFailure={responseGoogle}
//     cookiePolicy={'single_host_origin'}
//   />,
//   document.getElementById('googleButton')
// );
import React, { useState } from "react";


import ReactDOM from "react-dom";
import { GoogleLogin, GoogleLogout } from "react-google-login";
const GoogleLoginPage = () => {
  const client_id =
    "233345635594-km0tlqqrv2difnjgovf2jn11sgg7117c.apps.googleusercontent.com";
  const [showLoginButton, setLoginButton] = useState(true);
  const [showLogoutButton, setLogoutButton] = useState(false);
  const loginHandler = (res) => {
    console.log("res", res.profileObj);
    console.log("this is my")
    setLoginButton(false);
    setLogoutButton(true);
  };
  const failureHandler = (res) => {
    console.log("login failed", res);
  };
  const logoutHandler = (res) => {
    alert("logout sucessfully");
    setLoginButton(true);
    setLogoutButton(false);
  };
  return (
    <>
      {showLoginButton && (
        <>
          {/* <GoogleLogin
              className="google-item"            
              clientId={client_id}
              onSuccess={loginHandler}
              onFailure={failureHandler}
              cookiePolicy={"single_host_origin"}
            /> */}
          <GoogleLogin
            clientId={client_id}
            render={(renderProps) => (
              <button
                className="btn button btn-outline"
                onClick={renderProps.onClick}
                // disabled={renderProps.disabled}
              >
                <img  /> Sign Up with Google
              </button>
            )}
            onSuccess={loginHandler}
            onFailure={failureHandler}
            cookiePolicy={"single_host_origin"}
          />
        </>
      )}
      {showLogoutButton && (
        <GoogleLogout
          clientId={client_id}
          render={(renderProps) => (
            <button
              className="btn button btn-outline"
              onClick={renderProps.onClick}
              // disabled={renderProps.disabled}
            >
              <img  /> logout 
            </button>
          )}
          onLogoutSuccess={logoutHandler}
        ></GoogleLogout>
      )}
    </>
  );
};
export default GoogleLoginPage;