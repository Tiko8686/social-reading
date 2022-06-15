import { useEffect, useState } from "react";
import axios from 'axios';
import "./settings.css"
import { useNavigate } from "react-router-dom";

function Settings() {

  const [userToken, setUserToken] = useState("");
  const [current_password, setCurrent_password] = useState("")
  const [modal, setModal] = useState({ sure: false, password: false })
  const navigate = useNavigate()
  const [user, setUser] = useState("")

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const userr = JSON.parse(localStorage.getItem("user"));

    if (token) {
      setUserToken("JWT " + token.access)
      setUser(userr)
    } else {
      navigate("/")
    }
  }, []);


  const [passError, setPassError] = useState(false)

  function deleteAccount(event) {
    event.preventDefault()
    console.log(current_password)
    axios.post("https://socialreading.xyz/auth/jwt/create/", {
      email: user.email,
      password: current_password,
    })
      .then((resp) => {
        setModal({ sure: true, password: false })
      }).catch((error) => {
        if (error.response) {
          console.log("error.response ", error.response);
          if (error.response.data.detail) {
            setPassError(true)
          }
        } else if (error.request) {
          console.log("error.request ", error.request);
        } else if (error.message) {
          console.log("error.request ", error.message);
        }
      });
  }
  function yesDelete() {
    axios.delete("https://socialreading.xyz/auth/users/me/", {
      headers: {
        Authorization: userToken
      },
      data: {
        current_password
      }
    })
      .then((resp) => {
        console.log(resp);
        setModal({ sure: false, password: false });
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/")
      }).catch((error) => {
        if (error.response) {
          console.log("error.response ", error.response);
        } else if (error.request) {
          console.log("error.request ", error.request);
        } else if (error.message) {
          console.log("error.message ", error.message);
        }
      });

  }

  function deleteAccWithFbOrGoogle() {
    axios.delete("https://socialreading.xyz/auth/users/me/", {
      headers: { Authorization: userToken },
      data: { current_password: "WillChangeLater" }
    })
      .then((resp) => {
        console.log(resp);
        setModal({ sure: false, password: false });
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/")
      }).catch((error) => {
        if (error.response) {
          console.log("error.response ", error.response);
        } else if (error.request) {
          console.log("error.request ", error.request);
        } else if (error.message) {
          console.log("error.message ", error.message);
        }
      });
  }


  return (
    <>
      <div className="account_settings_div">
        <h2 className="account_settings">Account Settings</h2>
        <div>
          <h2>Change Password</h2>
        </div>

        <div className="delete_profile">
          <h2>Delete Account</h2>
          <p>Would you like to delete your account?
            By deleting your account you will lose all your data
          </p>
          <button onClick={() => setModal({ password: true, })} className="want_delete">I want to delete my account</button>
        </div>

      </div>

      {
        modal.password &&
        <div className="modal_delete_acc">
          <div className="overlay_delete_acc" onClick={() => setModal({ sure: false, password: false })}></div>
          <div className="modal_content_delete_acc">
            <h2>Delete Your Account</h2>
            <p>We're sorry to see you go.</p>
            <p>If you delete your account, there is no turning back.
              But before we do anything wrong, we want to make sure it's you.
            </p>
            {
              user?.auth_provider === "email" ? <form onSubmit={deleteAccount}>
                <label>Password</label>
                <input onChange={(event) => { setCurrent_password(event.target.value); setPassError(false) }} type="password" required />
                {passError && <span className="password_error">Your password is incorrect.</span>}
                <button className="delete_button">Yes, Delete My Account Forever</button>
              </form> : <button
                className="delete_button_google_fb"
                onClick={() => deleteAccWithFbOrGoogle()}
              >Delete My Account Forever</button>
            }

          </div>
        </div>
      }

      {modal.sure &&
        <div className="modal_sure">
          <div className="overlay_sure" onClick={() => setModal({ sure: false, password: false })}></div>
          <div className="modal_content_sure">
            <p>Are you sure</p>
            <div className="sure_buttons">
              <button onClick={() => yesDelete()}>Yes</button>
              <button onClick={() => {
                setModal({ sure: false, password: false });
                setCurrent_password("")
              }}>No</button>
            </div>

          </div>
        </div>
      }
    </>

  );
}

export default Settings;
