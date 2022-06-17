import axios from "axios";
import { useEffect, useState } from "react";
import "./editPost.css"
import fonts from "./../../components/fonts.json"
import Parser from 'html-react-parser';

function EditPost({ id, quoteText, textStyle, setTextEditor, setTextStyle, setQuoteText, setPost, quoteCategory }) {
    const [numbers, setNumbers] = useState([])
    const getNumbers = () => {
        let a = []
        for (let i = 1; i <= 36; i++) {
            a.push(i)
        }
        return a
    }
    const [cat, setCat] = useState("")

    useEffect(() => {
        setNumbers(getNumbers())
        setCat(quoteCategory)
    }, [])

    const [publishedDiv, setPublishedDiv] = useState(false)
    const [published, setPublished] = useState(false)

    //discardi jamanak posty deletea linum
    function deletePost() {
        axios.delete("https://www.socialreading.xyz/quotes/" + id).then(resp => {
            console.log(resp);
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
    return (
        <>
            <div className="modal-text-editor">
                <div className="overlay"></div>
                <div className="modal-content-text-editor">
                    <div className="text-editor-left-section">

                        <div>
                            <h3 className="your-upload-text">Your upload</h3>
                        </div>
                        <div className="text-editor-select-section">
                            <select onChange={(e) => setTextStyle({ ...textStyle, font: e.target.value })}>
                                <option value="">Aa Font</option>
                                {
                                    Object.values(fonts)?.map((font, index) => {
                                        return (<option value={font} key={index}>{font}</option>)
                                    })
                                }
                            </select><br />
                            <select onChange={(e) => setTextStyle({ ...textStyle, color: e.target.value })}>
                                <option value="">Aa Font color</option>
                                <option value="red">red</option>
                                <option value="blue">blue</option>
                                <option value="black">black</option>
                            </select><br />
                            <select onChange={(e) => setTextStyle({ ...textStyle, size: e.target.value })}
                            >
                                <option value="">Aa Font size</option>
                                {numbers.map(number => {
                                    return (<option value={number} key={number}>{number}</option>)
                                })}
                            </select><br />

                            {/* <input
                                placeholder="Category name"
                                value={cat}
                                className="quote_category"
                                required
                                onChange={(e) => setCat(e.target.value)}
                            /> */}
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
                            <button className="text-editor-button-discard"
                                onClick={
                                    () => {
                                        setTextStyle({ color: "black", font: "", hedline: "", background: "white", size: "16px" })
                                        setTextEditor(false)
                                        if (!setPost) {
                                            deletePost()
                                        }
                                    }
                                }
                            >Discard</button>
                            <button className="text-editor-button-save" onClick={() => {
                                setPublishedDiv(true)
                            }} >Save</button>
                        </div>
                    </div>
                    <div className="text-editor-textarea">
                        <div style={{
                           
                            color: textStyle.color,
                            background: textStyle.background,
                            fontFamily: textStyle.font,
                            fontSize: textStyle.size + "px",
                        }}>
                            {Parser(quoteText)}
                        </div>
                        {/* <textarea
                            value={quoteText}
                            style={{
                                color: textStyle.color,
                                background: textStyle.background,
                                fontFamily: textStyle.font,
                                fontSize: textStyle.size + "px",
                            }}
                            onChange={(e) => { setQuoteText(e.target.value) }}
                        ></textarea> */}

                    </div>
                </div>
            </div>
            {/* published post or not */}
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
                                <label htmlFor="published_yes">Yes</label>
                            </div>
                            <div>
                                <input type="radio" name="published" id="published_no" required onClick={(e) => {
                                    setPublished(!e.target.checked)
                                }} />
                                <label htmlFor="published_no">No</label>
                            </div>
                        </div>
                        <button onClick={() => {
                            let a = JSON.stringify(textStyle)
                            axios.patch(`https://www.socialreading.xyz/quotes/${id}/`,
                                { styles: a, quote_text: quoteText, published, is_active: true, book_category: cat }
                            ).then(res => {
                                if (!setPost) {
                                    window.location.reload()
                                }
                                fetch("https://www.socialreading.xyz/quotes/")
                                    .then((response) => response.json())
                                    .then((response) => {
                                        setPost(response);
                                    });
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

export default EditPost