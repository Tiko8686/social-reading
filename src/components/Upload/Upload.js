import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Upload.css";

export function Modal() {
  const { register, handleSubmit, reset } = useForm();
  const [modal, setModal] = useState(false);

  const createURL = (event) =>{
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      let src =URL.createObjectURL(file);

      console.log(src);
    }
  }

  const toggleModal = () => {
    setModal(!modal);
    reset({ bookName: "" });
    reset({ image: "" });
    reset({ bookCategory: "" });
  };
  const onSubmit = (data) => {
    
    const formData = new FormData();
    formData.append("book_author", data.authorName);
    formData.append("book_title", data.bookName);
    formData.append("book_category", data.bookCategory);
    formData.append("quote_file", data.image[0]);

    axios.post("http://www.socialreading.xyz/quotes/", formData).then(resp =>{
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
    toggleModal();
  };
  return (
    <>
      <button onClick={toggleModal} className="btn-modal bi bi-cloud-upload">
        &nbsp;&nbsp;Վերբեռնել
      </button>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <button className="close" onClick={toggleModal}>
              X
            </button>
            <div className="imageDiv">
                <img className="img" />
              <label for="files" className="fileLabel bi bi-cloud-upload">
                Վերբեռնել Նկար
              </label>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                className="authorName"
                placeholder="Գրքի հեղինակ"
                id="name"
                type="text"
                {...register("authorName")}
              />
              <input
                className="bookName"
                placeholder="Գրքի անուն"
                id="name"
                type="text"
                {...register("bookName")}
              />
              <input
                className="bookCategory"
                placeholder="Կատեգորիա"
                id="name"
                type="text"
                {...register("bookCategory")}
              />
              
              <input
                onClick={createURL}
                type="file"
                id="files"
                accept="image/png,image/jpeg, image/jpg"
                className="fileInput"
                {...register("image")}
              />
              <input className="submit" type="submit" value="Վերբեռնել" />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
