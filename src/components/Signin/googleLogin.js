import "./google.css";
import axios from "axios";
import { useEffect } from "react";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import FacebookLogin from "react-facebook-login";

const googleClientId = "157706975933-5mp07f2obqtjbrtbf3amqvts8s7q8puf.apps.googleusercontent.com";

function Login() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: googleClientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const onSuccess = (res) => {
    console.log("sucess login", res);
    axios
      .post("https://socialreading.xyz/social_auth/google/", {
        auth_token: res.tokenId,
      })
      .then((res) => {
        console.log(res.data);
        let a = "JWT " + res.data.access;
        axios
          .get("https://socialreading.xyz/auth/users/me/", {
            headers: { Authorization: a },
          })
          .then((response) => {
            console.log("act", response.data);
            localStorage.setItem("tokenGoogle", JSON.stringify(res.data));
            localStorage.setItem("userGoogle", JSON.stringify(response.data));
            window.location.reload();
          })
          .catch((error) => {
            if (error.response) {
              console.log("error.response", error.response);
            } else if (error.request) {
              console.log("error.request ", error.request);
            } else if (error.message) {
              console.log("error.request ", error.message);
            }
          });
      })
      .catch((error) => {
        if (error.response) {
          console.log("error.response  google ", error.response);
         if (error.response.data.detail) {
           alert("user with this email already exists.")
         }
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

  const responseFacebook = (response) => {
    console.log("hesa", response);
    console.log("token hesa", response.accessToken);

    // setAccessToken(response.accessToken);
    // console.log("token",accessToken);
    axios
      .post("https://socialreading.xyz/social_auth/facebook/ ", {
        auth_token: response.accessToken,
      })
      .then((res) => {
        console.log(res.data);
        let a = "JWT " + res.data.access;
        axios
          .get("https://socialreading.xyz/auth/users/me/", {
            headers: { Authorization: a },
          })
          .then((response) => {
            console.log("act fb", response.data);
            localStorage.setItem("tokenFb", JSON.stringify(res.data));
            localStorage.setItem("userFb", JSON.stringify(response.data));
            window.location.reload();
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
  // console.log(process.env.REACT_APP_BASE_URL);

  // const onFb = (res) => {
  //   console.log("sucess fb login", res.profileObj);
  //   setAccessToken(res.accessToken);
  //   console.log(accessToken);
  //   axios
  //     .post("https://socialreading.xyz/social_auth/facebook/ ", {
  //       auth_token: accessToken,
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       let a = "JWT " + res.data.access;
  //       axios
  //         .get("https://socialreading.xyz/auth/users/me/", {
  //           headers: { Authorization: a },
  //         })
  //         .then((response) => {
  //           console.log("act fb", response.data);
  //           localStorage.setItem("tokenFb", JSON.stringify(res.data));
  //           localStorage.setItem("userFb", JSON.stringify(response.data));
  //           window.location.reload()
  //         })
  //         .catch((error) => {
  //           if (error.response) {
  //             console.log("error.response ", error.response);
  //           } else if (error.request) {
  //             console.log("error.request ", error.request);
  //           } else if (error.message) {
  //             console.log("error.request ", error.message);
  //           }
  //         });
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         console.log("error.response ", error.response);
  //       } else if (error.request) {
  //         console.log("error.request ", error.request);
  //       } else if (error.message) {
  //         console.log("error.message ", error.message);
  //       }
  //     });
  // };

  return (
    <div className="googlefacebook">
      <GoogleLogin
        render={(renderProps) => (
          <button
            className="google"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <img
              alt="google_icon"
              src="https://social-reading-application.herokuapp.com/images/google.png"
              width="18px"
            />
          </button>
        )}
        clientId={googleClientId}
        buttonText=""
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
        onAutoLoadFinished={true}
      />
      <FacebookLogin
        appId="1042792122994981"
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="my-facebook-button-class"
        icon="fa-facebook"
        textButton=""
      />
    </div>
  );
}

export default Login;
