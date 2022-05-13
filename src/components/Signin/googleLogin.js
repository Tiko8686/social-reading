import "./google.css";
import axios from "axios";
import { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import { FacebookLogin } from "react-facebook-login";
import { useNavigate } from "react-router-dom";
const googleClientId =
  "157706975933-5mp07f2obqtjbrtbf3amqvts8s7q8puf.apps.googleusercontent.com";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const responseGoogle = (response) => {
    console.log(response);
    setName(response.profileObj.name);
    setEmail(response.profileObj.email);
    setUrl(response.profileObj.imageUrl);
  };
const navigate = useNavigate("")

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: googleClientId,
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  }, []);
  const [tokenId, settokenId] = useState("");
  const onSuccess = (res) => {
    console.log("sucess login", res.profileObj);

    settokenId(res.tokenId);
    console.log(tokenId);
    axios
      .post("https://socialreading.xyz/social_auth/google/", {
        auth_token: tokenId,
      })
      .then((res) => {
        console.log(res.data);
        let a = "JWT " + res.data.access;
        axios
          .get("https://socialreading.xyz/auth/users/me", {
            headers: { Authorization: a },
          })
          .then((response) => {
            console.log("act", response.data);
            localStorage.setItem("a", JSON.stringify(res.data));
            navigate("/profile");
            // TODO: save in state or local storage
          })
          .catch((error) => {
            if (error.response) {
              console.log("error.response ", error.response);
            } else if (error.request) {
              console.log("error.request ", error.request);
            } else if (error.message) {
              console.log("error.request ", error.message);
            }
          });
      })
      .catch((error) => {
        if (error.response) {
          console.log("error.response ", error.response);
        } else if (error.request) {
          console.log("error.request ", error.request);
        } else if (error.message) {
          console.log("error.message ", error.message);
        }
      });
  };
  const onFailure = (res) => {
    console.log("failed login", res);
  };

  async function responseFacebook(response) {
    console.log("Facebook success:");

    const data = await axios({
      method: "POST",
      url: "",
      data: { accessToken: response.accessToken, userId: response.userID },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        }
      })
      .then((data) => {
        console.log("Login with facebook success: ", data);
      });
  }

  return (
    <div className="App">
      {/* <FacebookLogin appId="538845831203436" callback={responseFacebook} />
     <div id="signInButton">
        </div> */}
      {/* <img src={url} alt={name} /> */}

      <GoogleLogin
        className="google"
        clientId={googleClientId}
        buttonText=""
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;

//  import '.../google.css'
// import GoogleLogin from 'react-google-login'
// import { useEffect } from 'react'
// import { gapi } from 'gapi-script'
// import axios from 'axios'

// import FacebookLogin from 'react-facebook-login'

// const googleClientId = "157706975933-5mp07f2obqtjbrtbf3amqvts8s7q8puf.apps.googleusercontent.com"

// function Login() {

//   useEffect(() => {
//     function start() {
//       gapi.client.init({
//         clientId: googleClientId,
//         scope: ""
//       })
//     }

//     gapi.load('client:auth2', start)
//   })

//   function successResponseGoogle(response) {
//     console.log('Google success:')

//     axios({
//       method: "POST",
//       url: 'http://192.168.1.103:8000/social_auth/google/',
//       data: {auth_token:response.tokenId}
//     }).then(res => {
//       if (res.status === 200) {
//         return res.data
//       }
//     }).then(data => {
//       console.log("Login with google success: ", data)
//     })
//   }

//   function errorResponseGoogle(response) {
//     console.log('Error:')
//     console.log(response)
//   }

//   async function responseFacebook(response) {
//     console.log('Facebook success:')

//     const data = await axios({
//       method: "POST",
//       url: '',
//       data: { accessToken: response.accessToken, userId: response.userID }
//     }).then(res => {
//       if (res.status === 200) {
//         return res.data
//       }
//     }).then(data => {
//       console.log("Login with facebook success: ", data)
//     })

//   }

//   return (
//     <div className="App">
//       <div>
//         {/* <h1>Login with google</h1> */}
//         <GoogleLogin
//           clientId={googleClientId}
//           buttonText="Log in with Google"
//           onSuccess={successResponseGoogle}
//           onFailure={errorResponseGoogle}
//           cookiePolicy={'single_host_origin'}
//         />
//       </div>

//       {/* <h1>Login with facebook</h1> */}
//       <FacebookLogin
//         appId="538845831203436"
//         callback={responseFacebook}
//       />

//     </div>
//   )
// }

// export default Login
