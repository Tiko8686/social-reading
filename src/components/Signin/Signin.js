import "./signin.css";
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Login from './googleLogin.js';
import { useNavigate } from 'react-router-dom';

export function Signin() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate()
  const [login, setLogin] = useState({ email: "", password: "" });
  const [email, setEmail] = useState({ email: "" })
  const [signup, setSignup] = useState(false);
  const [signin, setSigin] = useState(false);
  const [forgotPass, setForgotPass] = useState(false);
  const [confPasswordErr, setConfPasswordErr] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [wrong, setWrong] = useState("")


  const signUp = (data) => {
    if (data.password1 !== data.password2) {
      setConfPasswordErr(true)
    } else {
      axios.post("https://socialreading.xyz/auth/users/", {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password1
      }).then(resp => {
        console.log(resp.data)
        reset()
        toggleModal()
        setVerifyEmail(false)
      }).catch((error) => {
        if (error.response) {
          console.log("error.response ", error.response);
          if (error.response.data.email) {
            setEmailErr(error.response.data.email)
          }
        } else if (error.request) {
          console.log("error.request ", error.request);
        } else if (error.message) {
          console.log("error.request ", error.message);
        }
      });
      setConfPasswordErr(false)

    }
  }

  const toggleModal = () => {
    setSigin(false);
    setSignup(!signup);
    reset()
    setEmailErr("")
  };
  const toggleModalSignIn = () => {
    setSignup(false);
    setWrong("")
    setSigin(!signin);
    setLogin({ email: "", password: "" })
  };

  const toggleModalForgotPass = () => {
    setForgotPass(!forgotPass)
    setEmail({ email: "" })
  };


  const sendCode = (event) => {
    event.preventDefault()
    console.log(email)
    axios.post("https://www.socialreading.xyz/auth/users/reset_password/", { email: email.email })
      .then(res => {
        console.log("act", res.data)
        alert("go to email")
      }).catch((error) => {
        if (error.response) {
          console.log("error.response ", error.response);
          alert(error.response.data[0])
        } else if (error.request) {
          console.log("error.request ", error.request);
        } else if (error.message) {
          console.log("error.request ", error.message);
        }
      });
    toggleModalForgotPass()
  }

  const submitChackin = (event) => {
    event.preventDefault();
    axios.post("https://socialreading.xyz/auth/jwt/create/",
      { email: login.email, password: login.password })
      .then(resp => {
        const userInfo = "JWT " + resp.data.access
        console.log(resp.data)
        axios.get("https://socialreading.xyz/auth/users/me",
          {
            headers: { "Authorization": userInfo }
          })
          .then(response => {
            console.log("act", response.data)
            localStorage.setItem('token', JSON.stringify(resp.data));
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate("/")
            setLogin({ email: "", password: "" })
            toggleModalSignIn()
            window.location.reload()
          }).catch((error) => {
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
          if (error.response.data.detail) {
            setWrong(error.response.data.detail)
          }
        } else if (error.request) {
          console.log("error.request ", error.request);
        } else if (error.message) {
          console.log("error.request ", error.message);
        }
      });

  };
  return (
    <>
      <button onClick={toggleModal} className="signin bi-person" style={{ color: "white" }}></button>
      {signup ? (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content-sign">
            <button className="close" onClick={toggleModal}>X</button>
            <form onSubmit={handleSubmit(signUp)} className="form_style">
              <h2>Sign Up</h2>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  {...register("first_name", { required: true, maxLength: 20, minLength: 2, pattern: /^[aA-zZ]+$/ })}
                />
                {errors.first_name && errors.first_name.type === "required" && <span>This is required*</span>}
                {errors.first_name && errors.first_name.type === "maxLength" && <span>Author name can't be more than 20 characters</span>}
                {errors.first_name && errors.first_name.type === "minLength" && <span>Author name can't be less than 2 characters</span>}
                {errors.first_name && errors.first_name.type === "pattern" && <span>Author name can be only letters.</span>}
              </div>

              <div>
                <label htmlFor="surname">Surname</label>
                <input
                  id="surname"
                  type="text"
                  {...register("last_name", { required: true, maxLength: 20, minLength: 2, pattern: /^[aA-zZ]+$/ })}
                />
                {errors.last_name && errors.last_name.type === "required" && <span>This is required*</span>}
                {errors.last_name && errors.last_name.type === "maxLength" && <span>Author name can't be more than 20 characters</span>}
                {errors.last_name && errors.last_name.type === "minLength" && <span>Author name can't be less than 2 characters</span>}
                {errors.last_name && errors.last_name.type === "pattern" && <span>Author surname can be only letters.</span>}

              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  onClick={() => setEmailErr("")}
                  {...register("email", { required: true, type: "email", pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ })}
                />
                {errors.email && errors.email.type === "required" && <span>This is required*</span>}
                {errors.email && errors.email.type === "email" && <span>Error*</span>}
                {errors.email && errors.email.type === "pattern" && <span>Email is not valid.</span>}
                {emailErr && <span>{emailErr}</span>}
              </div>

              <div>
                <label htmlFor="password1">Password</label>
                <input
                  id="password1"
                  type="password"
                  {...register("password1", { required: true, maxLength: 15, minLength: 8, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/ })}
                />
                {errors.password1 && errors.password1.type === "required" && <span>This is required*</span>}
                {errors.password1 && errors.password1.type === "maxLength" && <span>Password can't be more than 15 characters*</span>}
                {errors.password1 && errors.password1.type === "minLength" && <span>Password can't be less than 8 characters*</span>}
                {errors.password1 && errors.password1.type === "pattern" && <span>Password must be containe uppercase, lowercase and number*</span>}
              </div>
              <div>
                <label htmlFor="password2">Re-enter Password</label>
                <input
                  id="password2"
                  type="password"
                  onClick={() => setConfPasswordErr(false)}
                  {...register("password2", { required: true })}
                />
                {errors.password2 && errors.password2.type === "required" && <span>This is required*</span>}
                {confPasswordErr && <span>The password and confirmation password doesn't match*</span>}
              </div>
              <div>
                <input type="submit" value="Sign Up" id="submit-btn" />
              </div>
              <div onClick={() => setSignup(false)}>
                <Login></Login>
              </div>
              <div>
                <button onClick={toggleModalSignIn} className="btn-acc">Already have an account?</button>
              </div>
            </form>
          </div>
        </div>
      ) : signin ? (
        <div className="modal">
          <div onClick={toggleModalSignIn} className="overlay"></div>
          <div className="modal-content-sign">
            <button className="close" onClick={toggleModalSignIn}>X</button>
            <form onSubmit={submitChackin} className="form_style">
              <h2>Log In</h2>
              <div>
                {
                  wrong && <p style={{ color: "red" }}>{wrong}</p>
                }
              </div>
              <div>
                <label htmlFor="emailLogin">Email</label>
                <input
                  id="emailLogin"
                  type="email"
                  value={login.email}
                  required

                  onChange={(e) => {
                    setWrong("")
                    setLogin({ ...login, email: e.target.value })
                  }
                  }
                />
              </div>
              <div>
                <label htmlFor="passwordLogin">Password</label>
                <input
                  id="passwordLogin"
                  type="password"
                  value={login.password}
                  required
                  onChange={(e) => {
                    setWrong("")
                    setLogin({ ...login, password: e.target.value })
                  }
                  }
                />
              </div>

              <div className="submit_and_forgot">
                <input
                  type="submit"
                  value="Sign in"
                  id="submit-btn"
                />
                <button
                  className="forgot_btn"
                  type="button"
                  onClick={() => {
                    setForgotPass(true);
                    setSigin(false)
                  }}>Forgot password?</button>
              </div>
              <div>
                <button onClick={toggleModal} className="btn-acc">Don't have an account?</button>
              </div>
            </form>
          </div>
        </div>
      ) : ""}
      {forgotPass && <div className="modal">
        <div onClick={toggleModalForgotPass} className="overlay"></div>
        <div className="modal-content-sign">
          <button className="close" onClick={toggleModalForgotPass}>X</button>
          <form className="form_style" onSubmit={sendCode}>
            <div className="forgot_text">
              <h2 className="forgot_header">Forgot Password?</h2>
              <p className="forgot_text_text">Enter your email address to reset your password</p>
            </div>
            <div>
              <label>Email</label>
              <input type="email"
                className="email_input"
                onChange={(e) => setEmail({ ...email, email: e.target.value })}
                value={email.email}
              />
            </div>
            <div>
              <input type="submit" value="Reset Password" id="send-btn" />
            </div>
          </form>
        </div>
      </div>}
      {
        verifyEmail && <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content-sign">
            <button className="close">X</button>
            <h1>Verify your email address. Click the link in the email we sent you.</h1>
            <button>Resend verification</button>
            <button onClick={() => setVerifyEmail(false)}>ok</button>
          </div>
        </div>
      }
    </>
  );
}
