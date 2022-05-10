import axios from "axios";
import { useState } from "react";
import GoogleLogin from "react-google-login";

const clientId =
  "157706975933-5mp07f2obqtjbrtbf3amqvts8s7q8puf.apps.googleusercontent.com";

function Login() {
  const [tokenId, settokenId] = useState();
  const onSuccess = (res) => {
    console.log("sucess login", res.profileObj);
    console.log(res.tokenId);
    settokenId(res.tokenId);
    console.log(tokenId);
    axios
      .post("https://socialreading.xyz/social_auth/google/", {auth_token:tokenId})
      .then((res) => {
        console.log(res.data)
      }).catch((error) => {
        if (error.response) {
          console.log("error.response ", error.response);
        } else if (error.request) {
          console.log("error.request ", error.request);
        } else if (error.message) {
          console.log("error.message ", error.message);
        }
      });;
  };
  const onFailure = (res) => {
    console.log("failed login", res);
  };
  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        // cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  );
}
export default Login;
