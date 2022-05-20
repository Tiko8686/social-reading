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
  const [resetPass, setResetPass] = useState(false);
  const [emailForgotErr, setEmailForgotErr] = useState("");
  const [password1Eye, setPassword1Eye] = useState(false)
  const [loginEye, setLoginEye] = useState(false)
  const [password2Eye, setPassword2Eye] = useState(false)
  const [wrongEmailOrPass, setWrongEmailOrPass] = useState({ email: "", pass: "" })
  const [emailRe, setEmailRe] = useState("")
  const resend = () => {
    console.log(emailRe)
    axios.post("https://socialreading.xyz/auth/users/resend_activation/", { email: emailRe }).then(resp => {
      console.log(resp.data)
    }).catch((error) => {
      if (error.response) {
        console.log("error.response ", error.response);
      } else if (error.request) {
        console.log("error.request ", error.request);
      } else if (error.message) {
        console.log("error.request ", error.message);
      }
    });

  }

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
        setEmailRe(data.email)
        setVerifyEmail(true)
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
    setPassword1Eye(false)
    setPassword2Eye(false)
  };
  const toggleModalSignIn = () => {
    setSignup(false);
    setWrongEmailOrPass({ email: "", pass: "" })
    setSigin(!signin);
    setLogin({ email: "", password: "" })
    setLoginEye(false)
  };

  const toggleModalForgotPass = () => {
    setForgotPass(!forgotPass)
    setEmail({ email: "" })
    setEmailForgotErr(false)
    setEmailRe("")
  };


  const sendCode = (event) => {
    event.preventDefault()
    console.log(email)
    axios.post("https://www.socialreading.xyz/auth/users/reset_password/", { email: email.email })
      .then(res => {
        console.log("act", res.data)
        setResetPass(true)
        toggleModalForgotPass()
      }).catch((error) => {
        if (error.response) {
          console.log("error.response ", error.response);
          setEmailForgotErr(error.response.data[0])
        } else if (error.request) {
          console.log("error.request ", error.request);
        } else if (error.message) {
          console.log("error.request ", error.message);
        }
      });
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
            console.log("stex")
            axios.get("https://www.socialreading.xyz/register/").then(result => {
              console.log("all users", result.data)
              for (const user of result.data) {
                if (user.email === login.email) {
                  setWrongEmailOrPass({ email: "", pass: "Password is wrong." })
                  break;
                } else {
                  setWrongEmailOrPass({ ...wrongEmailOrPass, email: "User with this email doesn't exists." })
                }
              }
            })
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
      <button onClick={toggleModalSignIn} className="signin bi-person"></button>
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

              <div className="password_div">
                <label htmlFor="password1">Password</label>
                <input
                  id="password1"
                  type={password1Eye ? "text" : "password"}
                  {...register("password1", { required: true, maxLength: 15, minLength: 8, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/ })}
                />
                {!password1Eye ?
                  <div className="password_eye" onClick={() => setPassword1Eye(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                    </svg>
                  </div> :
                  <div className="password_eye" onClick={() => setPassword1Eye(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                    </svg>
                  </div>
                }
                {errors.password1 && errors.password1.type === "required" && <span>This is required*</span>}
                {errors.password1 && errors.password1.type === "maxLength" && <span>Password can't be more than 15 characters*</span>}
                {errors.password1 && errors.password1.type === "minLength" && <span>Password can't be less than 8 characters*</span>}
                {errors.password1 && errors.password1.type === "pattern" && <span>Password must be containe uppercase, lowercase and number*</span>}
              </div>
              <div className="password_div">
                <label htmlFor="password2">Re-enter Password</label>
                <input
                  id="password2"
                  type={password2Eye ? "text" : "password"}
                  onClick={() => {
                    setConfPasswordErr(false)
                  }}
                  {...register("password2", { required: true })}
                />
                {!password2Eye ?
                  <div className="password_eye" onClick={() => setPassword2Eye(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                    </svg>
                  </div> :
                  <div className="password_eye" onClick={() => setPassword2Eye(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                    </svg>
                  </div>
                }
                {errors.password2 && errors.password2.type === "required" && <span>This is required*</span>}
                {confPasswordErr && <span>The password and re-enter password doesn't match*</span>}
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
                <label htmlFor="emailLogin">Email</label>
                <input
                  id="emailLogin"
                  type="email"
                  value={login.email}
                  required
                  onClick={() => {
                    setWrongEmailOrPass({ email: "", pass: "" })
                  }}
                  onChange={(e) => {
                    setLogin({ ...login, email: e.target.value })
                  }
                  }
                />
                {wrongEmailOrPass.email && <span>{wrongEmailOrPass.email}</span>}
              </div>
              <div className="password_div">
                <label htmlFor="passwordLogin">Password</label>
                <input
                  id="passwordLogin"
                  type={loginEye ? "text" : "password"}
                  value={login.password}
                  required
                  onClick={() => {
                    setWrongEmailOrPass({ email: "", pass: "" })
                  }}
                  onChange={(e) => {
                    setLogin({ ...login, password: e.target.value })
                  }
                  }
                />
                {!loginEye ?
                  <div className="password_eye" onClick={() => setLoginEye(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                    </svg>
                  </div> :
                  <div className="password_eye" onClick={() => setLoginEye(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                    </svg>
                  </div>
                }
                {wrongEmailOrPass.pass && <span>{wrongEmailOrPass.pass}</span>}
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
                <Login></Login>
              </div>
              <div>
                <button onClick={toggleModal} className="btn-acc">Don't have an account?</button>
              </div>
            </form>
          </div>
        </div>
      ) : ""
      }
      {
        forgotPass && <div className="modal">
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
                  onClick={() => setEmailForgotErr(false)}
                  onChange={(e) => setEmail({ ...email, email: e.target.value })}
                  value={email.email}
                />
                {emailForgotErr && <span>{emailForgotErr}</span>}
              </div>
              <div>
                <input type="submit" value="Reset Password" id="send-btn" />
              </div>
            </form>
          </div>
        </div>
      }
      {
        verifyEmail && <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content-sign">
            <button className="close">X</button>
            <div className="verify_email_content">
              <p className="verify_text">Verify your email address. Click the link in the email we sent you.</p>
              <div>
                <button onClick={() => resend()}>Resend activation</button>
                <button onClick={() => {
                  setVerifyEmail(false);
                  setEmailRe("")
                }}>Okay</button>
              </div>
            </div>
          </div>
        </div>
      }
      {
        resetPass && <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content-sign">
            <button className="close">X</button>
            <h1>Click the link in the email we sent you.</h1>
            <button onClick={() => setResetPass(false)}>ok</button>
          </div>
        </div>

      }
    </>
  );
}
