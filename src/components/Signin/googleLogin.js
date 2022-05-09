import axios from "axios";
import { useState } from "react";
import GoogleLogin from "react-google-login";

const clientId =
  "157706975933-5mp07f2obqtjbrtbf3amqvts8s7q8puf.apps.googleusercontent.com";

function Login() {
  const [accessToken, setAccessToken] = useState();
  const onSuccess = (res) => {
    console.log("sucess login", res.profileObj);
    console.log(res.accessToken);
    setAccessToken(res.accessToken);
    axios
      .post("https://socialreading.xyz/social_auth/google/", accessToken)
      .then((res) => console.log(res.accessToken));
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
