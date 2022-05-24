import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Upload.css";


import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { ContentState } from "draft-js";
import { convertToRaw, convertFromHTML } from "draft-js";
import { convertToHTML } from 'draft-convert';



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
    }
  }, []);
  useEffect(() => {
    axios.get("https://socialreading.xyz/categories/").then((resp) => {
      setCategories(
        resp.data.map((category) => {
          return category.name;
        })
      );
    });
  }, []);
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



  const [textEditor, setTextEditor] = useState(false)


  const onSubmit = (data) => {
    if (categoryValue && file) {
      const formData = new FormData();
      formData.append("book_author", data.authorName);
      formData.append("quote_title", data.bookName);
      formData.append("book_category", categoryValue);
      formData.append("quote_file", file);
      axios.post("https://www.socialreading.xyz/quotes/", formData, { headers: { "Authorization": user } }).then((resp) => {
        console.log(resp.data);
        setEditorState(
          EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML(`<p>${resp.data.quote_text}</p>`)
            )
          ),
        )
        setId(resp.data.id)
        setTextEditor(true)
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

  let _contentState = ContentState.createFromText('Sample content state');

  const raw = convertToRaw(_contentState)
  const [contentState, setContentState] = useState(raw)
  console.log("contentState", contentState)

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(
        convertFromHTML('<p>...</p>')
      )
    ),
  );

  const [convertedContent, setConvertedContent] = useState("")
  const [id, setId] = useState("")


  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
    console.log("state", state);
  }

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    console.log("currentContentAsHTML", currentContentAsHTML)
    setConvertedContent(currentContentAsHTML);
  }

 
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
              {/* {errors.bookName && errors.bookName.type === "required" && (
                <span className="bookNameErr">
                  Այս դաշտը պարտադիր է լրացման
                </span>
              )} */}
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
      {textEditor && <div className="editor">
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
        // value="dad"
        />
        {/* <textarea value={uploadRespons.quote_text} style={{ width: "500px", height: "200px" }}></textarea> */}
        {/* <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div> */}\
        <button onClick={() => {
          if (convertedContent) {
            axios.patch(`https://www.socialreading.xyz/quotes/${id}/`, { quote_text: convertedContent }).then(res => {
              console.log(res.data)
            }).catch((error) => {
              if (error.response) {
                console.log("error.response ", error.response);
              } else if (error.request) {
                console.log("error.request ", error.request);
              } else if (error.message) {
                console.log("error.request ", error.message);
              }
            });
          }
          
        }} >Save</button>
        <button>cancel</button>
      </div>}


    </>
  );
}
