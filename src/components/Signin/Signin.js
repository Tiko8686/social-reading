import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "./Signin.css";
export function Signin() {
  const { register, handleSubmit, reset } = useForm();
  const [signin, setsigin] = useState(false);

  const toggleModal = () => {
    setsigin(!signin);
    reset({ email: "" });
    reset({ password: "" });
  };
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("user_name", data.email);
    formData.append("user_password", data.password);

    axios
      .post("http://192.168.0.124:8000/quotes/", formData)
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
  };
  return (
    <>
      <button
        onClick={toggleModal}
        className="signin bi-person login-btn"
        style={{ color: "white" }}
      ></button>

      {signin && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <button className="close" onClick={toggleModal}>
              X
            </button>
            <h1 className="signuph1"> Գրանցվել</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ul>
                {" "}
                <li className="">
                  <input
                    className="nameSurname"
                    placeholder="Անուն Ազգանուն"
                    id="namesurname"
                    type="text"
                    {...register("nameSurname")}
                  />
                </li>
                <input
                  className="email"
                  placeholder="Էլ․հասցե"
                  id="email"
                  type="email"
                  {...register("email")}
                />
                <input
                  className="password"
                  placeholder="Գաղտնաբառ"
                  id="password"
                  type="password"
                  {...register("password")}
                />
                <input
                  className="password_2 "
                  placeholder="ԿրկնելԳաղտնաբառը"
                  id="password"
                  type="password"
                  {...register("password")}
                />
              </ul>
              <input className="submit" type="submit" value="sign in" />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
