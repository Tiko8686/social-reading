import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Upload.css";

export function Modal() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [modal, setModal] = useState(false);
  const [categories, setCategories] = useState([])
  const [categoryValue, setCategoryValue] = useState("")
  const [categoryErr, setCategoryErr] = useState({required: false, minLength: false, maxLength: false})
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

  const categoryValueChange = (event) => {
    setCategoryErr(({required: false, minLength: false, maxLength: false}))
    setCategoryValue(event.target.value)
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
      if (category.toLowerCase().includes(event.target.value.toLowerCase()) && !searchedWords.includes(category)) {
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
    setCategoryErr(({required: false, minLength: false, maxLength: false}))
    setSearchModal(false)
    setCategoryValue("")
    reset({ bookName: "" });
    reset({ image: "" });
  };
  const checkCategory = () => {
    if (categoryValue === "") {
      setCategoryErr({...categoryErr, required: true})
    }else if(categoryValue.length<2 && categoryValue.length !== ""){
      setCategoryErr({...categoryErr, minLength: true})
    }else if(categoryValue.length>20){
      setCategoryErr({...categoryErr, maxLength: true})
    }
  }
  const onSubmit = (data) => {
    if (categoryValue) {
      const formData = new FormData();
      formData.append("book_author", data.authorName);
      formData.append("book_title", data.bookName);
      formData.append("book_category", categoryValue);
      formData.append("quote_file", data.image[0]);
      axios.post("https://www.socialreading.xyz/quotes/", formData).then(resp => {
        console.log(resp.data);
      })
      axios.post("https://socialreading.xyz/categories/", {
        name: categoryValue
      }).then(resp => {
        console.log(resp.data);
      })
      toggleModal();
    }
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
                {...register("authorName", {
                  required: true, maxLength: 20, minLength: 2
                })}
              />
              {errors.authorName && errors.authorName.type === "required" && <span className="authorNameErr">This is required*</span>}
              {errors.authorName && errors.authorName.type === "maxLength" && <span className="authorNameErr">Author name can't be more than 20 characters</span>}
              {errors.authorName && errors.authorName.type === "minLength" && <span className="authorNameErr">Author name can't be less than 2 characters</span>}
              <input
                autocomplete="off"
                className="bookName"
                placeholder="Գրքի անուն"
                id="name"
                type="text"
                {...register("bookName", {
                  required: true, maxLength: 20, minLength: 2
                })}
              />
              {errors.bookName && errors.bookName.type === "maxLength" && <span className="bookNameErr">Book name can't be more than 20 characters</span>}
              {errors.bookName && errors.bookName.type === "minLength" && <span className="bookNameErr">Book name can't be less than 2 characters</span>}
              {errors.bookName && errors.bookName.type === "required" && <span className="bookNameErr">This is required*</span>}
              <div className="category_search" >
                <img src="http://localhost:3000/images/search.svg" className="search_img" />
                <input
                  value={categoryValue}
                  onChange={(event) => categoryValueChange(event)}
                  autocomplete="off"
                  className="bookCategory"
                  placeholder="Կատեգորիա"
                  id="name"
                  type="text"
                />
                {categoryErr.required && <p className="categoryErr">This is required*</p>}
                {categoryErr.minLength && <p className="categoryErr">Author name can't be less than 2 characters</p>}
                {categoryErr.maxLength && <p className="categoryErr">Book name can't be more than 20 characters</p>}
              </div>
              <input
                type="file"
                id="files"
                accept="image/png, image/jpeg, image/jpg"
                className="fileInput"
                {...register("image", { required: "This is required." })}
              />
              {errors.image && errors.image.type === "required" && <span className="imageErr">This is required*</span>}
              <input className="submit" type="submit" value="Վերբեռնել" onClick={checkCategory} />
            </form>
            {searchModal &&
              <div className="suggestions">
                {filteredCategories.map((category) => {
                  return <p className="searchedWords" onClick={() => { setCategoryValue(category); searchWindow() }}>{category}</p>
                })}
              </div>
            }
          </div>
        </div>
      )}
    </>
  );
}