import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Upload.css";

export function Modal() {
  const { register, handleSubmit, reset } = useForm();
  const [modal, setModal] = useState(false);
  const [categories, setCategories] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [filteredCategories, setFilteredCategories] = useState([])
  const [searchModal, setSearchModal] = useState(false)
  const searchWindow = () => {
    setSearchModal(!searchModal)
  }
  useEffect(() => {
    axios.get("https://socialreading.xyz/categories/").then(resp => {
      setCategories(resp.data.map((category) => {
        return category.name
      }));
    })
  }, []);

  const inputValueChange = (event) => {
    setInputValue(event.target.value)
    if (event.target.value !== "") {
      setSearchModal(true)
    } else {
      setSearchModal(false)
    }
    const searchedWords = categories.filter((category) => {
      if (category.toLowerCase().startsWith(event.target.value.toLowerCase())) {
        return category
      }
    })
    searchedWords.push(...categories.filter((category) => {
      if (category.toLowerCase().includes(event.target.value.toLowerCase())) {
        return category
      }
    }))
    let test = categories.filter((category) => {
      if (category.toLowerCase().includes(event.target.value.toLowerCase())) {
        return category
      }
    })
    if (test.length === 0) {
      setSearchModal(false)
    }
    setFilteredCategories(searchedWords)

  }
  const toggleModal = () => {
    setModal(!modal);
    setSearchModal(false)
    reset({ bookName: "" });
    reset({ image: "" });
    reset({ bookCategory: "" });
  };
  const onSubmit = (data) => {
    console.log(categories);
    const formData = new FormData();
    formData.append("book_author", data.authorName);
    formData.append("book_title", data.bookName);
    formData.append("book_category", inputValue);
    formData.append("quote_file", data.image[0]);

    axios.post("https://www.socialreading.xyz/quotes/", formData).then(resp => {
      console.log(resp.data);
    })
    axios.post("https://socialreading.xyz/categories/", {
      name: inputValue
    }).then(resp => {
      console.log(resp.data);
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
          <div className="modal-content" onClick={() => { setSearchModal(false) }}>
            <button className="close" onClick={toggleModal}>
              X
            </button>
            <div className="imageDiv">
              <img className="img" />
              <label for="files" className="fileLabel bi bi-cloud-upload">
                &nbsp; Վերբեռնել Նկար
              </label>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                autocomplete="off"
                className="authorName"
                placeholder="Գրքի հեղինակ"
                id="name"
                type="text"
                {...register("authorName")}
              />
              <input
                autocomplete="off"
                className="bookName"
                placeholder="Գրքի անուն"
                id="name"
                type="text"
                {...register("bookName")}
              />
              <div className="category_search" >
                <img src="http://localhost:3000/images/search.svg" className="search_img" />
                <input
                  onChange={(event) => inputValueChange(event)}
                  autocomplete="off"
                  className="bookCategory"
                  placeholder="Կատեգորիա"
                  id="name"
                  type="text"
                  value={inputValue}
                />
              </div>
              <input
                type="file"
                id="files"
                accept="image/png,image/jpeg, image/jpg"
                className="fileInput"
                {...register("image")}
              />
              <input className="submit" type="submit" value="Վերբեռնել" />
            </form>
            {searchModal &&
              <div className="suggestions">
                {filteredCategories.map((category) => {
                  return <p className="searchedWords" onClick={() => { setInputValue(category); searchWindow() }}>{category}</p>
                })}
              </div>
            }
          </div>
        </div>
      )}
    </>
  );
}


