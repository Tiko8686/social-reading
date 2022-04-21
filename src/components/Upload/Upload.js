import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Modal.css";

export function Modal() {
  const { register, handleSubmit, reset } = useForm();
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
    fetch("http://192.168.0.124:8000/quotes/", requestOptions).then((res) =>
      console.log(res)
    );
    toggleModal();
    reset({ bookName: '' })
    reset({ image: '' })
  };
  return (
    <>
      <button onClick={toggleModal} className="fa fa-upload btn-modal ">
        &nbsp;&nbsp;Վերբեռնել
      </button>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <button className="close" onClick={toggleModal}>X</button>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label for="name" className="bookNameLabel">
                Գրքի անուն
              </label>
              <input
                className="BookNameInput"
                id="name"
                type="text"
                {...register("bookName")}
              />
              <label for="files" className="fileLabel">
                Հատված գրքից
              </label>
              <input
                type="file"
                id="files"
                accept="image/png,image/jpeg"
                class="fileInput"
                {...register("image")}
              />
              <label for="files" className="fileButton">
                <span>Ընտրել նկար</span>
              </label>
              <input className="submit" type="submit" value="Վերբեռնել" />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
