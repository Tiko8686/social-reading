import "./signin.css";
import React, { useState } from "react";
import axios from "axios";
import validator from "validator";

export function Signin() {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [signup, setSignup] = useState(false);
  const [signin, setSigin] = useState(false);
  const [register, setRegister] = useState({ first_name: "", last_name: "", email: "", password1: "", password2: "" });
  const [validate, setValidate] = useState({ first_name: false, last_name: false, email: false, password1: false, password2: false })
  const signUp = (event) => {
    event.preventDefault();
    if (register.first_name.length < 2) {
      setValidate({ ...validate, first_name: true })
    }
    if (register.last_name.length < 2) {
      setValidate({ ...validate, last_name: true })
    }
    if (!validator.isEmail(register.email)) {
      setValidate({ ...validate, email: true })
    }
    if (register.password1 !== register.password2) {
      setValidate({ ...validate, password2: true })
    }
    if (!validator.isStrongPassword(register.password1, { minSymbols: 0 })) {
      setValidate({ ...validate, password1: true })
    }
    if (
      register.first_name.length >= 2 && 
      register.last_name.length >= 2 &&
      validator.isEmail(register.email) &&
      register.password1 === register.password2 && validator.isStrongPassword(register.password1, { minSymbols: 0 })
    ) {
      axios.post("http://192.168.0.107:8000/auth/users/", {
        first_name: register.first_name,
        last_name: register.last_name,
        email: register.email,
        password: register.password1
      }).then(resp => {
        console.log(resp.data)
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
      setRegister({ first_name: "", last_name: "", email: "", password1: "", password2: "" })
    }
  };

  const toggleModal = () => {
    setSigin(false);
    setSignup(!signup);
    setRegister({ first_name: "", last_name: "", email: "", password1: "", password2: "" })
  };
  const toggleModalSignIn = () => {
    setSignup(false);
    setSigin(!signin);
    setLogin({ email: "", password: "" })
  };

  const submitChackin = (event) => {
    event.preventDefault();
    axios.post("http://192.168.0.107:8000/accounts/login/",
      { email: login.email, password: login.password })
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
  console.log(validate)
  return (
    <>
      <button
        onClick={toggleModal}
        className="signin bi-person"
        style={{ color: "white" }}
      ></button>
      {signup ? (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content-sign">
            <button className="close" onClick={toggleModal}>X</button>
            <form onSubmit={signUp} className="form_style" >
              <h2>Գրանցվել</h2>
              <div>
                <label htmlFor="name">Անուն</label>
                <input
                  id="name"
                  type="text"
                  value={register.first_name}
                  required
                  onChange={(e) => {
                    setRegister({ ...register, first_name: e.target.value });
                    setValidate({ ...validate, first_name: false })
                  }}
                />
                {validate.first_name && <span>Name must be more then 2 letters*</span>}
              </div>
              <div>
                <label htmlFor="surname">Ազգանուն</label>
                <input
                  id="surname"
                  type="text"
                  value={register.last_name}
                  required
                  onChange={(e) => {
                    setRegister({ ...register, last_name: e.target.value });
                    setValidate({ ...validate, last_name: false })
                  }}
                />
                {validate.last_name && <span>Surname must be more then 2 letters*</span>}
              </div>
              <div>
                <label htmlFor="email">Էլ․հասցե</label>
                <input
                  id="email"
                  type="email"
                  value={register.email}
                  required
                  onChange={(e) => {
                    setRegister({ ...register, email: e.target.value });
                    setValidate({ ...validate, email: false })
                  }}
                />
                {validate.email && <span>Email is invalid*</span>}
              </div>
              <div>
                <label htmlFor="password1">Գաղտնաբառ</label>
                <input
                  id="password1"
                  type="password"
                  value={register.password1}
                  required
                  onChange={(e) => {
                    setRegister({ ...register, password1: e.target.value });
                    setValidate({ ...validate, password1: false })
                  }}
                />
                {validate.password1 && <span>Password must consist of one lowercase, uppercase letter and number, at least 8 characters*</span>}
              </div>
              <div>
                <label htmlFor="password2">Կրկնել գաղտնաբառը</label>
                <input
                  id="password2"
                  type="password"
                  value={register.password2}
                  required
                  onChange={(e) => {
                    setRegister({ ...register, password2: e.target.value });
                    setValidate({ ...validate, password2: false })
                  }}
                />
                {validate.password2 && <span>Repeated password incorrectly*</span>}
              </div>
              <div>
                <input type="submit" value="Գրանցվել" id="submit-btn" />
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
              <h2>Մուտք գործել</h2>
              <div>
                <label htmlFor="emailLogin">Էլ․հասցե</label>
                <input
                  id="emailLogin"
                  type="email"
                  value={login.email}
                  required
                  onChange={(e) =>
                    setLogin({ ...login, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="passwordLogin">Գաղտնաբառ</label>
                <input
                  id="passwordLogin"
                  type="password"
                  value={login.password}
                  required
                  onChange={(e) =>
                    setLogin({ ...login, password: e.target.value })
                  }
                />
              </div>
              <div>
                <input
                  type="submit"
                  value="Մուտք գործել"
                  id="submit-btn"
                />
              </div>
              <div>
                <button onClick={toggleModal} className="btn-acc">Don't have an account?</button>
              </div>
            </form>
          </div>
        </div>
      ) : ""}
    </>
  );
}
