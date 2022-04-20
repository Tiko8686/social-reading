import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Modal.css";

export function Modal() {
  const { register, handleSubmit } = useForm();
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("author", data.bookName);
    formData.append("quote", data.image[0]);
    const requestOptions = {
      method: "POST",
      body: formData,
    };
    fetch("http://192.168.1.30:8000/quotes/", requestOptions).then((res) => console.log(res));
  };
  return (
    <>
      <button onClick={toggleModal} className="btn-modal fa fa-upload">
        &nbsp;&nbsp;Վերբեռնել
      </button>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Upload Something</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="Name of book"
                {...register("bookName")}
              />
              <input
                type="file"
                accept="image/png,image/jpeg"
                {...register("image")}
              />
              <input className="submit" type="submit" />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
