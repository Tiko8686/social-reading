import "./signin.css";
import React, { useState } from "react";
import axios from "axios";
import validator from "validator";

export function Signin() {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [signup, setSignup] = useState(false);
  const [signin, setSigin] = useState(false);
  const [register, setRegister] = useState({ username: "", email: "", password1: "", password2: "" });
  const signUp = (event) => {
    event.preventDefault();
    if (register.username.length < 1) {
      alert("You did not enter your Name")
    }
    if (!validator.isEmail(register.email)) {
      alert("You did not enter email");
    } else if (register.password1 !== register.password2) {
      alert("Repeated password incorrectly");
    } else if (
      !validator.isStrongPassword(register.password1, { minSymbols: 0 })
    ) {
      alert(
        "Password must consist of one lowercase, uppercase letter and number, at least 8 characters"
      );
    } else {
      console.log(register);
      setRegister({ username: "", email: "", password1: "", password2: "" })
    }
  };

  const toggleModal = () => {
    setSigin(false);
    setSignup(!signup);
  };
  const toggleModalSignIn = () => {
    setSignup(false);
    setSigin(!signin);
  };

  const submitChackin = (event) => {
    event.preventDefault();
    axios.post("http://192.168.0.107:8000/accounts/login/", login)
      .then((resp) => {
        console.log(resp.data);
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
    setLogin({ email: "", password: "" })
  };
  return (
    <>
      <button
        onClick={toggleModal}
        className="signin bi-person login-btn"
        style={{ color: "white" }}
      ></button>
      {signup ? (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <button className="close" onClick={toggleModal}>
              X
            </button>
            <form onSubmit={signUp}>

              <input
                className="nameSurname"
                placeholder="Անուն Ազգանուն"
                id="namesurname"
                type="text"
                value={register.username}
                onChange={(e) => {
                  setRegister({ ...register, username: e.target.value });
                }}
              />

              <input
                className="email"
                placeholder="Էլ․հասցե"
                id="email"
                type="email"
                value={register.email}
                onChange={(e) => {
                  setRegister({ ...register, email: e.target.value });
                }}
              />

              <input
                className="password"
                placeholder="Գաղտնաբառ"
                id="password"
                type="password"
                value={register.password1}
                onChange={(e) => {
                  setRegister({ ...register, password1: e.target.value });
                }}
              />

              <input
                className="password_2"
                placeholder="Կրկնել գաղտնաբառը"
                id="password_2"
                type="password"
                value={register.password2}
                onChange={(e) => {
                  setRegister({ ...register, password2: e.target.value });
                }}
              />

              <input className="submit" type="submit" value="Գրանցվել" />
            </form>
            <button onClick={toggleModalSignIn}>
              Already have an account?
            </button>
          </div>
        </div>
      ) : signin ? (
        <div className="modal">
          <div onClick={toggleModalSignIn} className="overlay"></div>
          <div className="modal-content">
            <button className="close" onClick={toggleModalSignIn}>
              X
            </button>
            <form onSubmit={submitChackin}>

              <input
                className="email"
                placeholder="Էլ․հասցե"
                id="emailLogin"
                type="email"
                value={login.email}
                onChange={(e) =>
                  setLogin({ ...login, email: e.target.value })
                }
              />

              <input
                className="password"
                placeholder="Գաղտնաբառ"
                id="passwordLogin"
                type="password"
                value={login.password}
                onChange={(e) =>
                  setLogin({ ...login, password: e.target.value })
                }
              />

              <input
                className="submit"
                type="submit"
                value="Մուտք գործել"
              />

            </form>
            <button onClick={toggleModal}>Don't have an account?</button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
