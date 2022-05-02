import "./signin.css";
import React, { useState } from "react";
import axios from "axios";
import validator from "validator";

export function Signin() {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [signup, setSignup] = useState(false);
  const [signin, setSigin] = useState(false);
  const [register, setRegister] = useState({ first_name: "", last_name: "", email: "", password1: "", password2: "" });
  const signUp = (event) => {
    event.preventDefault();
    if (register.first_name.length < 1) {
      alert("You did not enter your Name")
    }
    if (register.last_name.length < 1) {
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
      axios.post("http://192.168.1.30:8000/auth/users/", {
        first_name: register.first_name,
        last_name: register.last_name,
        email: register.email,
        password: register.password1
      }).catch((error) => {
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
  };
  const toggleModalSignIn = () => {
    setSignup(false);
    setSigin(!signin);
  };

  const submitChackin = (event) => {
    event.preventDefault();
    axios.post("http://192.168.1.30:8000/auth/token/login/",
      { email: login.email, password: login.password })
      .then((resp) => {
        axios.post("http://192.168.1.30:8000/auth/users/me/",
          { headers: { "authorization": "token " + resp.data } }).then(resp => {
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
          <div className="modal-content-sign">
            <button className="close" onClick={toggleModal}>
              X
            </button>
            <form onSubmit={signUp} className="form_style">
              <h2>Գրանցվել</h2>
              <div>
                <label>Անուն</label>

                <input
                  className="nameSurname"
                  id="name"
                  type="text"
                  value={register.first_name}
                  onChange={(e) => {
                    setRegister({ ...register, first_name: e.target.value });
                  }}
                />
              </div>
              <div>
                <label>Ազգանուն</label>
                <input
                  className="nameSurname"
                  id="surname"
                  type="text"
                  value={register.last_name}
                  onChange={(e) => {
                    setRegister({ ...register, last_name: e.target.value });
                  }}
                />
              </div>
              <div>
                <label>Էլ․հասցե</label>

                <input
                  className="email"
                  id="email"
                  type="email"
                  value={register.email}
                  onChange={(e) => {
                    setRegister({ ...register, email: e.target.value });
                  }}
                />
              </div>

              <div>
                <label>Գաղտնաբառ</label>
                <input
                  className="password"
                  id="password"
                  type="password"
                  value={register.password1}
                  onChange={(e) => {
                    setRegister({ ...register, password1: e.target.value });
                  }}
                />
              </div>

              <div>
                <label>Կրկնել գաղտնաբառը</label>
                <input
                  className="password_2"
                  id="password_2"
                  type="password"
                  value={register.password2}
                  onChange={(e) => {
                    setRegister({ ...register, password2: e.target.value });
                  }}
                />
              </div>
              <div>
                <input type="submit" value="Գրանցվել" id="submit-btn" />
              </div>
              <div>
                <button onClick={toggleModalSignIn} className="btn-acc">
                  Already have an account?
                </button>
              </div>
            </form>

          </div>
        </div>
      ) : signin ? (
        <div className="modal">
          <div onClick={toggleModalSignIn} className="overlay"></div>
          <div className="modal-content-sign">
            <button className="close" onClick={toggleModalSignIn}>
              X
            </button>

            <form onSubmit={submitChackin} className="form_style">
              <h2>Մուտք գործել</h2>
              <div>
                <label>Էլ․հասցե</label>

                <input
                  className="email"
                  id="emailLogin"
                  type="email"
                  value={login.email}
                  onChange={(e) =>
                    setLogin({ ...login, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Գաղտնաբառ</label>

                <input
                  className="password"
                  id="passwordLogin"
                  type="password"
                  value={login.password}
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
      ) : (
        ""
      )}
    </>
  );
}
