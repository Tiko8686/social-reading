import { useEffect, useState } from "react";
import axios from 'axios';
import "./settings.css"
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

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


  // change password
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const [changePassError, setChangePassError] = useState({ re_new: "", current: "" })
const [changeSuccess,  setChangeSuccess] = useState("")
  function changePass(data) {
    if (data.new_password === data.re_new_password) {
      axios.post("https://socialreading.xyz/auth/users/set_password/", data, {
        headers: {
          Authorization: userToken
        }
      }).then((resp) => {
        console.log(resp);
        reset()
        setChangeSuccess("Your password has been changed.")
      }).catch((error) => {
        if (error.response) {
          console.log("error.response ", error.response);
          if (error.response.data.current_password) {
            setChangePassError({ ...changePassError, current: error.response.data.current_password })

          }
        } else if (error.request) {
          console.log("error.request ", error.request);
        } else if (error.message) {
          console.log("error.request ", error.message);
        }
      });
    } else {
      setChangePassError({ ...changePassError, re_new: "The password and re-enter password doesn't match" })
    }

  }

  return (
    <>
      <div className="account_settings_div">
        <h2 className="account_settings">Account Settings</h2>
        <hr />

        <div className="change_password" onClick={() => setChangeSuccess("")}>
          <form onSubmit={handleSubmit(changePass)}
              onClick={() => setChangePassError({ ...changePassError, re_new: "", current: "" })}
          >
            <h2>Change Password</h2>
            <p className="successText">{changeSuccess}</p>
            <input
              type="text"
              placeholder="Current password"
              {...register("current_password", {
                required: true
              })}

            />
            {errors.current_password && errors.current_password.type === "required" && (
              <span>This is required*</span>
            )}
            {changePassError.current && <span>{changePassError.current}</span>}
            <input
              type="text"
              placeholder="New password"
              {...register("new_password", {
                required: true,
                maxLength: 15,
                minLength: 8,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
              })}
            />
            {errors.new_password && errors.new_password.type === "required" && (
              <span>This is required*</span>
            )}
            {errors.new_password && errors.new_password.type === "maxLength" && (
              <span>Password can't be more than 15 characters*</span>
            )}
            {errors.new_password && errors.new_password.type === "minLength" && (
              <span>Password can't be less than 8 characters*</span>
            )}
            {errors.new_password && errors.new_password.type === "pattern" && (
              <span>
                Password must be containe uppercase, lowercase and number*
              </span>
            )}

            <input
              type="text"
              {...register("re_new_password", {
                required: true,
                maxLength: 15,
                minLength: 8,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,

              })}
              placeholder="Re-enter password"
            />
            {errors.re_new_password && errors.re_new_password.type === "required" && (
              <span>This is required*</span>
            )}
            {errors.re_new_password && errors.re_new_password.type === "maxLength" && (
              <span>Password can't be more than 15 characters*</span>
            )}
            {errors.re_new_password && errors.re_new_password.type === "minLength" && (
              <span>Password can't be less than 8 characters*</span>
            )}
            {errors.re_new_password && errors.re_new_password.type === "pattern" && (
              <span>
                Password must be containe uppercase, lowercase and number*
              </span>
            )}
            {changePassError.re_new && <span>{changePassError.re_new}</span>}

            <button type="submit" className="change_password_button">Change password</button>
          </form>
        </div>





        <hr />
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
          <button className="close_delete_acc"  onClick={() => setModal({ sure: false, password: false })}>X</button>
            
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
