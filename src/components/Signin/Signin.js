import { useForm } from "react-hook-form";
import "./signin.css";
import React, { useState } from 'react'
import axios from 'axios';
import validator from 'validator';


export function Signin() {
  const { register, handleSubmit, reset } = useForm();
  const [login, setLogin] = useState({ email: "", password: "" })
  const [signup, setSignup] = useState(false);
  const [signin, setSigin] = useState(false);



  const toggleModal = () => {
    setSigin(false)
    setSignup(!signup);
    // reset({ email: "" });
    // reset({ password: "" });
  };
  const toggleModalSignIn = () => {
    setSignup(false)
    setSigin(!signin)
  }
  const onSubmit = (data) => {
    axios.post("")
    console.log(data)

    }
  //   // axios
  //   //   .post("http://192.168.0.124:8000/quotes/", formData)
  //   //   .then((resp) => {
  //   //     console.log(resp.data);
  //   //   })
  //   //   .catch((error) => {
  //   //     if (error.response) {
  //   //       console.log("error.response ", error.response);
  //   //     } else if (error.request) {
  //   //       console.log("error.request ", error.request);
  //   //     } else if (error.message) {
  //   //       console.log("error.request ", error.message);
  //   //     }
  //   //   });
  //   //   toggleModal();
  //   //   reset({ bookName: "" });
  //   //   reset({ image: "" });
  //   //   reset({ bookCategory: "" });
  //   //   console.log(123);
  // };


const submitChackin = event => {
  event.preventDefault();
  
     console.log(login)
  
}
  return (
    <>
      <button
        onClick={toggleModal}
        className="signin bi-person login-btn"
        style={{ color: "white" }}
      ></button>

      {signup ? <div className="modal">
        <div onClick={toggleModal} className="overlay"></div>
        <div className="modal-content">
          <button className="close" onClick={toggleModal}>
            X
          </button>
          <form onSubmit={handleSubmit(signup)}>
            <ul>
              <li >
                <input
                  className="nameSurname"
                  placeholder="Անուն Ազգանուն"
                  id="namesurname"
                  type="text"
                  {...register("nameSurname")}
                />
              </li>
              <li>
                <input
                  className="email"
                  placeholder="Էլ․հասցե"
                  id="email"
                  type="email"
                  {...register("email")}
                />
              </li>
              <li>
                <input
                  className="password"
                  placeholder="Գաղտնաբառ"
                  id="password"
                  type="password"
                  {...register("password")}
                />
              </li>
              <li>
                <input
                  className="password_2"
                  placeholder="Կրկնել գաղտնաբառը"
                  id="password_2"
                  type="password"
                  {...register("password_2")}
                />
              </li>
            </ul>
            <input className="submit" type="submit" value="Գրանցվել" />
          </form>
          <button onClick={toggleModalSignIn}>Already have an account?</button>

        </div>
      </div>
        : signin ? <div className="modal">
          <div onClick={toggleModalSignIn} className="overlay"></div>
          <div className="modal-content">
            <button className="close" onClick={toggleModalSignIn}>
              X
            </button>
            <form onSubmit={submitChackin}>
            <ul>
              <li>
                <input
                  className="email"
                  placeholder="Էլ․հասցե"
                  id="emailLogin"
                  type="email"
                  value={login.email}
                  onChange={(e) => setLogin({ ...login, email: e.target.value })}
                />
              </li>
              <li>
                <input
                  className="password"
                  placeholder="Գաղտնաբառ"
                  id="passwordLogin"
                  type="password"
                  value={login.password}
                  onChange={(e) => setLogin({ ...login, password: e.target.value })}

                />
              </li>
              <li>
                <input className="submit" type="submit" value="Մուտք գործել"/>
              </li>
            </ul>
            </form>
              

            <button onClick={toggleModal}>Don't have an account?</button>
          </div>
        </div> : ""}
    </>
  );
}
