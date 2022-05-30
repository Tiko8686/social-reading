import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Upload.css";

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
    }

  }, []);
  useEffect(() => {
    axios.get("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCm5RYrRxcdoJ7RxVJJq12lWT_rto8315A").then(res => {
      // setFontFamily(res.data.items)
      console.log(res)
    }).catch((error) => {
      if (error.response) {
        console.log("error.response ", error.response);
      } else if (error.request) {
        console.log("error.request ", error.request);
      } else if (error.message) {
        console.log("error.request ", error.message);
      }
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


  //upload
  const onSubmit = (data) => {
    if (categoryValue && file) {
      const formData = new FormData();
      formData.append("book_author", data.authorName);
      formData.append("quote_title", data.bookName);
      formData.append("book_category", categoryValue);
      formData.append("quote_file", file);
      axios.post("https://www.socialreading.xyz/quotes/", formData, { headers: { "Authorization": user } }).then((resp) => {
        console.log(resp.data);
        // setEditorState(
        //   EditorState.createWithContent(
        //     ContentState.createFromBlockArray(
        //       convertFromHTML(`<p>${resp.data.quote_text}</p>`)
        //     )
        //   ),
        // )
        setId(resp.data.id)
        setQuoteText(resp.data.quote_text)
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
  //text editor
  const [textEditor, setTextEditor] = useState(false)
  const [quoteText, setQuoteText] = useState("")
  const [id, setId] = useState("");
  const [publishedDiv, setPublishedDiv] = useState(false)
  const [published, setPublished] = useState(false)



  // let _contentState = ContentState.createFromText('Sample content state');

  // const raw = convertToRaw(_contentState)
  // const [contentState, setContentState] = useState(raw)
  // console.log("contentState", contentState)

  // const [editorState, setEditorState] = useState(
  //   EditorState.createWithContent(
  //     ContentState.createFromBlockArray(
  //       convertFromHTML('<p>...</p>')
  //     )
  //   ),
  // );

  // const [convertedContent, setConvertedContent] = useState("")
  // const [id, setId] = useState("")


  // const handleEditorChange = (state) => {
  //   setEditorState(state);
  //   convertContentToHTML();
  //   console.log("state", state);
  // }

  // const convertContentToHTML = () => {
  //   let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
  //   console.log("currentContentAsHTML", currentContentAsHTML)
  //   setConvertedContent(currentContentAsHTML);
  // }
  const [textStyle, setTextStyle] = useState({ color: "black", font: "", hedline: "", background: "white", size: "16px" })
  console.log(textStyle)



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
      {
        textEditor && <div className="modal-text-editor">
          <div className="overlay"></div>
          <div className="modal-content-text-editor">
            <div className="text-editor-left-section">
              <div>
                <h3 className="your-upload-text">Your upload</h3>
              </div>
              <div className="text-editor-select-section">
                <select onChange={(e) => setTextStyle({ ...textStyle, font: e.target.value })}>
                  <option value="">Aa Font</option>
                  <option value="inherit">Inherit</option>
                  <option value="initial">Initialt</option>
                  <option value="italic">italic</option>
                  <option value="normal">normal</option>
                  <option value="oblique">oblique</option>
                  <option value="revert">revert</option>
                  <option value="unset">unset</option>
                  {/* {
                  fontFamily && fontFamily?.map(e => {
                    return (<option key={e?.id} value={e?.family}>{e?.family}</option>)
                  })
                } */}
                </select><br />
                <select onChange={(e) => setTextStyle({ ...textStyle, color: e.target.value })}>
                  <option value="">Aa Font color</option>
                  <option value="red">red</option>
                  <option value="blue">blue</option>
                  <option value="black">black</option>
                </select><br />
                <select onChange={(e) => setTextStyle({ ...textStyle, hedline: e.target.value })}>
                  <option value="">Aa Headline</option>
                </select><br />
                <select onChange={(e) => setTextStyle({ ...textStyle, size: e.target.value })}>
                  <option value="">Aa Font size</option>
                  <option value={10}>10</option>
                  <option value={11}>11</option>
                  <option value={12}>12</option>
                  <option value={13}>13</option>
                  <option value={14}>14</option>
                  <option value={15}>15</option>
                  <option value={16}>16</option>
                  <option value={17}>17</option>
                </select>
              </div>
              <div>
                <h1>Backgrounds</h1>
              </div>
              <div className="text-editor-background-colors">
                <div>
                  <div onClick={() => { setTextStyle({ ...textStyle, background: "white" }) }}
                    style={{ backgroundColor: "white", width: "25px", height: "25px", borderRadius: "100%", border: "1px solid grey" }}
                  ></div>
                  <div onClick={() => { setTextStyle({ ...textStyle, background: "#FFB8DE" }) }}
                    style={{ backgroundColor: "#FFB8DE", width: "25px", height: "25px", borderRadius: "100%" }}></div>
                  <div onClick={() => { setTextStyle({ ...textStyle, background: "#FF74D4" }) }}
                    style={{ backgroundColor: "#FF74D4", width: "25px", height: "25px", borderRadius: "100%" }}></div>
                  <div onClick={() => { setTextStyle({ ...textStyle, background: "#FF36AB" }) }}
                    style={{ backgroundColor: "#FF36AB", width: "25px", height: "25px", borderRadius: "100%" }}></div>
                  <div onClick={() => { setTextStyle({ ...textStyle, background: "#642CA9" }) }}
                    style={{ backgroundColor: "#642CA9", width: "25px", height: "25px", borderRadius: "100%" }}></div>
                </div>
                <div>
                  <div onClick={() => { setTextStyle({ ...textStyle, background: "linear-gradient(90deg, #FBDA61 0%, #FF5ACD 100%), #8447FF" }) }}
                    style={{
                      background: "linear-gradient(90deg, #FBDA61 0%, #FF5ACD 100%), #8447FF",
                      width: "25px", height: "25px", borderRadius: "100%"
                    }}></div>
                  <div onClick={() => { setTextStyle({ ...textStyle, background: "#FFBA66" }) }}
                    style={{ backgroundColor: "#FFBA66", width: "25px", height: "25px", borderRadius: "100%" }}></div>
                  <div onClick={() => { setTextStyle({ ...textStyle, background: "#FF828F" }) }}
                    style={{ backgroundColor: "#FF828F", width: "25px", height: "25px", borderRadius: "100%" }}></div>
                  <div onClick={() => { setTextStyle({ ...textStyle, background: "#00CEC9" }) }}
                    style={{ backgroundColor: "#00CEC9", width: "25px", height: "25px", borderRadius: "100%" }}></div>
                  <div onClick={() => { setTextStyle({ ...textStyle, background: "#FF7497" }) }}
                    style={{ backgroundColor: "#FF7497", width: "25px", height: "25px", borderRadius: "100%" }}></div>
                </div>
              </div>
              <div className="text-editor-button">
                <button className="text-editor-button-discard" onClick={() => {
                  setTextStyle({ color: "black", font: "", hedline: "", background: "white", size: "16px" })
                  setTextEditor(false)
                }
                }>Discard</button>
                <button className="text-editor-button-save" onClick={() => {
                  setPublishedDiv(true)
                }} >Save</button>
              </div>
            </div>
            <div className="text-editor-textarea">
              <textarea
                value={quoteText}
                style={{
                  color: textStyle.color,
                  background: textStyle.background,
                  fontStyle: textStyle.font,
                  fontSize: textStyle.size + "px",
                }}
                onChange={(e) => { setQuoteText(e.target.value) }}
              ></textarea>
            </div>
          </div>
        </div>
      }
      {
        publishedDiv && <div className="modal-text-editor">
          <div className="overlay"></div>
          <div className="modal-content-published_or_not">
            <div className="modal-content-published-text">Do you want to show on the news feed?</div>
            <div className="modal-content_yes_or_no">
              <div>
                <input type="radio" name="published" id="published_yes" required onClick={(e) => {
                  setPublished(e.target.checked)
                }} />
                <label for="published_yes">Yes</label>
              </div>
              <div>
                <input type="radio" name="published" id="published_no" required onClick={(e) => {
                  setPublished(!e.target.checked)
                }} />
                <label for="published_no">No</label>
              </div>
            </div>
            <button onClick={() => {
              console.log(published)
              let a = JSON.stringify(textStyle)
              axios.patch(`https://www.socialreading.xyz/quotes/${id}/`,
                { styles: a, quote_text: quoteText, published, is_active: true }
              ).then(res => {
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
              setTextStyle({ color: "black", font: "", hedline: "", background: "white", size: "16px" })
              setTextEditor(false)
              setPublishedDiv(false)
            }}>Save</button>
          </div>
        </div>
      }
    </>
  );
}
















{/* <canvas width="500px" height="500px" style={{ backgroundColor: textStyle.background, border: "1px solid" }} ref={canvasRef}></canvas> */ }

{/* {textEditor && <div className="editor">
 <Editor
   editorState={editorState}
   onEditorStateChange={handleEditorChange}
   wrapperClassName="wrapper-class"
   editorClassName="editor-class"
   toolbarClassName="toolbar-class"
 // value="dad"
 />

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
</div>} */}
{/* <button onClick={()=> a()}>a</button>
<div id="node" style={{color:"red", backgroundColor: "blue",fontSize:"50px"}}>
 barev
</div> */}