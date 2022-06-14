import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Upload.css";
import EditPost from "../EditPost/EditPost";
import Loading from "../Loading/Loading";

export function Upload() {
  const { register, handleSubmit, formState: { errors }, reset, } = useForm();
  const [categoryErr, setCategoryErr] = useState({ required: false, minLength: false, maxLength: false, });
  const [modal, setModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryValue, setCategoryValue] = useState("");
  const [fileErr, setFileErr] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchModal, setSearchModal] = useState(false);
  const [file, setFile] = useState(undefined);
  const suggestions = ["Professional", "Artistic", "Historical", "Motivational", "Psychological"];
  const [suggestWindow, setSuggestWindow] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"))
    if (token) {
      setUser("JWT " + token.access)
      axios.get("https://socialreading.xyz/categories/").then((resp) => {
        setCategories(
          resp.data.map((category) => {
            return category.name;
          })
        );
      });

      // //refresh token
      // axios.get("https://socialreading.xyz/auth/users/me/", {
      //   headers: { Authorization: "JWT " + token.access },
      // }).then((response) => {
      //   console.log(response.data);
      // }).catch((error) => {
      //   if (error.response) {
      //     console.log("error.response ", error.response);
      //     if (error.response.data.detail) {
      //       axios.post("https://socialreading.xyz/auth/jwt/refresh/", { refresh: token.refresh }).
      //         then((response) => {
      //           console.log(response.data);
      //           localStorage.setItem("token", JSON.stringify({ refresh: token.refresh, access: response.data.access }))
      //         }).catch((error) => {
      //           if (error.response) {
      //             console.log("error.response ", error.response);
      //             if (error.response.data.detail) {
      //               localStorage.removeItem("user")
      //               localStorage.removeItem("token")
      //             }
      //           } else if (error.request) {
      //             console.log("error.request ", error.request);
      //           } else if (error.message) {
      //             console.log("error.message ", error.message);
      //           }
      //         });
      //     }
      //   } else if (error.request) {
      //     console.log("error.request ", error.request);
      //   } else if (error.message) {
      //     console.log("error.request ", error.message);
      //   }
      // });
    }
  }, []);

  // google fonts
  // useEffect(() => {
  //   axios.get("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCm5RYrRxcdoJ7RxVJJq12lWT_rto8315A").then(res => {
  //     // setFontFamily(res.data.items)
  //     console.log(res)
  //   }).catch((error) => {
  //     if (error.response) {
  //       console.log("error.response ", error.response);
  //     } else if (error.request) {
  //       console.log("error.request ", error.request);
  //     } else if (error.message) {
  //       console.log("error.request ", error.message);
  //     }
  //   });
  // }, []);

  function showPreview(event) {
    if (event.target.files.length > 0) {
      setFileErr(false);
      setFile(event.target.files[0]);
      let src = URL.createObjectURL(event.target.files[0]);
      let preview = document.getElementById("file-id-1-preview");
      preview.src = src;
      preview.style.display = "block";
      preview.style.width = "100%";
      preview.style.height = "100%";
      preview.style.borderRadius = "30px";
    }
  }

  const categoryValueChange = (event) => {
    setCategoryErr({ required: false, minLength: false, maxLength: false, fileRequired: false });

    setCategoryValue(event.target.value);
    if (event.target.value === "") {
      setSuggestWindow(true);
      setSearchModal(false);
    } else {
      setSuggestWindow(false);
      setSearchModal(true);
    }
    const searchedWords = categories.filter((category) => {
      if (category.toLowerCase().startsWith(event.target.value.toLowerCase())) {
        return category;
      }
    });
    searchedWords.push(
      ...categories.filter((category) => {
        if (
          category.toLowerCase().includes(event.target.value.toLowerCase()) &&
          !searchedWords.includes(category)
        ) {
          return category;
        }
      })
    );
    let test = categories.filter((category) => {
      if (category.toLowerCase().includes(event.target.value.toLowerCase())) {
        return category;
      }
    });
    if (test.length === 0) {
      setSearchModal(false);
    }
    setFilteredCategories(searchedWords);
  };

  const toggleModal = () => {
    setFile(undefined);
    setFileErr(false);
    setModal(!modal);
    setCategoryErr({ required: false, minLength: false, maxLength: false, fileRequired: false });
    setSearchModal(false);
    setSuggestWindow(false);
    setCategoryValue("");
    reset({ bookName: "" });
    reset({ image: "" });
  };

  const checkCategory = () => {
    if (file === undefined) {
      setFileErr(true);
    }
    if (categoryValue === "") {
      setCategoryErr({ ...categoryErr, required: true });
    } else if (categoryValue.length < 2 && categoryValue.length !== "") {
      setCategoryErr({ ...categoryErr, minLength: true });
    } else if (categoryValue.length > 20) {
      setCategoryErr({ ...categoryErr, maxLength: true });
    }
  };


  const [loading, setLoading] = useState(false)

  //upload
  const onSubmit = (data) => {
    if (categoryValue && file) {
      setLoading(true)
      const formData = new FormData();
      formData.append("book_author", data.authorName);
      formData.append("quote_title", data.bookName);
      formData.append("book_category", categoryValue);
      formData.append("quote_file", file);

      axios.post("https://www.socialreading.xyz/quotes/", formData, { headers: { "Authorization": user } }).then((resp) => {
        console.log(resp.data);
        setId(resp.data.id)
        setQuoteText(resp.data.quote_text)
        setTextEditor(true)
        setLoading(false)
      }).catch((error) => {
        if (error.response) {
          console.log("error.response ", error.response);
        } else if (error.request) {
          console.log("error.request ", error.request);
        } else if (error.message) {
          console.log("error.request ", error.message);
        }
      });
      toggleModal();
    }
  };

  //text editor
  const [textEditor, setTextEditor] = useState(false)
  const [quoteText, setQuoteText] = useState("")
  const [id, setId] = useState("");
  const [textStyle, setTextStyle] = useState({ color: "black", font: "", hedline: "", background: "white", size: "16px" })

  return (
    <>
      <button onClick={toggleModal} className="btn-modal bi bi-cloud-upload">
        &nbsp;&nbsp;Upload</button>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <button className="close" onClick={toggleModal}> X</button>
            <div
              className="imageDiv"
              onClick={() => {
                setSuggestWindow(false);
                setSearchModal(false);
              }}
            >
              <img className="img" id="file-id-1-preview" />
              <label htmlFor="files" className="fileLabel bi bi-cloud-upload">
                &nbsp; Upload Image</label>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              onClick={() => {
                setSuggestWindow(false);
                setSearchModal(false);
              }}
            >
              <input
                autoComplete="off"
                className="authorName"
                placeholder="Author of the book"
                id="name"
                type="text"
                {...register("authorName", {
                  maxLength: 20,
                  minLength: 2,
                })}
              />
              {errors.authorName && errors.authorName.type === "maxLength" && (
                <span className="authorNameErr">Դաշտը պետք է ներառի ոչ ավել քան 20 նիշ</span>
              )}
              {errors.authorName && errors.authorName.type === "minLength" && (
                <span className="authorNameErr">Դաշտը պետք է ներառի ամենաքիչը 2 նիշ</span>
              )}
              <input
                autoComplete="off"
                className="bookName"
                placeholder="Name of the book"
                id="name"
                type="text"
                {...register("bookName", { maxLength: 20, minLength: 2 })}
              />
              {errors.bookName && errors.bookName.type === "maxLength" && (
                <span className="bookNameErr">
                  Դաշտը պետք է ներառի ոչ ավել քան 20 նիշ
                </span>
              )}
              {errors.bookName && errors.bookName.type === "minLength" && (
                <span className="bookNameErr">
                  Դաշտը պետք է ներառի ամենաքիչը 2 նիշ
                </span>
              )}
              <div className="category_search">
                <img
                  src="https://social-reading-application.herokuapp.com/images/search.svg"
                  className="search_img"
                />
                {categoryErr.required && (
                  <p className="categoryErr">Այս դաշտը պարտադիր է լրացման</p>
                )}
                {categoryErr.minLength && (
                  <p className="categoryErr">
                    Դաշտը պետք է ներառի ամենաքիչը 2 նիշ
                  </p>
                )}
                {categoryErr.maxLength && (
                  <p className="categoryErr">
                    Դաշտը պետք է ներառի ոչ ավել քան 20 նիշ
                  </p>
                )}
              </div>
              <input
                type="file"
                id="files"
                accept="image/png, image/jpeg, image/jpg"
                className="fileInput"
                onChange={showPreview}
              />
              {fileErr && (
                <p className="fileRequired" >Այս դաշտը պարտադիր է լրացման</p>
              )}
              <input
                className="submit"
                type="submit"
                value="Upload"
                onClick={checkCategory}
              />
            </form>
            <input
              value={categoryValue}
              onChange={(event) => categoryValueChange(event)}
              onFocus={() => setSuggestWindow(true)}
              autoComplete="off"
              className="bookCategory"
              placeholder="Category of the book"
              id="name"
              type="text"
            />
            {suggestWindow && (
              <div className="suggestions" onClick={() => { setSuggestWindow(false) }}>
                {suggestions.map((suggest, index) => {
                  return (
                    <p
                      key={index}
                      className="suggestedWords"
                      onClick={() => {
                        setCategoryValue(suggest);
                        setSuggestWindow(false);
                      }}
                    >{suggest}</p>
                  );
                })}
              </div>
            )}
            {searchModal && (
              <div className="searches" onClick={() => { setSearchModal(false) }}>
                {filteredCategories.map((category, index) => {
                  return (
                    <p key={index}
                      className="searchedWords"
                      onClick={() => {
                        setCategoryValue(category);
                        setSearchModal(false);
                      }}
                    >{category}</p>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* text Editor */}
      {
        textEditor && <EditPost
          id={id}
          quoteText={quoteText}
          textStyle={textStyle}
          setTextEditor={setTextEditor}
          setTextStyle={setTextStyle}
          setQuoteText={setQuoteText}
        />
      }

      {/* loading */}
      {
        loading && <Loading/>
      }
    </>
  );
}














