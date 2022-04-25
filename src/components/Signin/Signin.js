import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

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

      axios.post("http://192.168.0.124:8000/quotes/", formData).then(resp =>{
        console.log(resp.data);
      }).catch((error) => {
        if (error.response) {
            console.log("error.response ", error.response);
        } else if (error.request) {
            console.log("error.request ", error.request);
        } else if (error.message) {
            console.log("error.request ", error.message);
        }
    })
    //   toggleModal();
    //   reset({ bookName: "" });
    //   reset({ image: "" });
    //   reset({ bookCategory: "" });
    //   console.log(123);
    };
    return (
      <>
       
            <button onClick={toggleModal} className="signin bi-person login-btn" style={{ color: "white" }}></button>
          
        {signin && (
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
              <button className="close" onClick={toggleModal}>
                X
              </button>
             
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  className="authorName"
                  placeholder="email"
                  id="name"
                  type="text"
                  {...register("authorName")}
                />
                <input
                  className="bookName"
                  placeholder="password"
                  id="name"
                  type="text"
                  {...register("bookName")}
                />
                
               
            
                <input className="submit" type="submit" value="sign in" />
              </form>
            </div>
          </div>
        )}
      </>
    );
  }