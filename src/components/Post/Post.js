import axios from "axios";
import { useEffect, useState } from "react";
import "./post.css"
import * as htmlToImage from 'html-to-image';
import EditPost from "../EditPost/EditPost";
import { useNavigate } from "react-router-dom";
import Comment from "../../components/Comment/Comment";

function Post({ post, setPost }) {
    const navigate = useNavigate()
    const [userToken, setUserToken] = useState("");
    const [user, setUser] = useState("")

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        if (token) {
            setUserToken("JWT " + token.access)
            setUser(JSON.parse(localStorage.getItem("user")));
        }
    }, [navigate]);

    // comments
    const [idPost, setIdPost] = useState("")
    const [value, setValue] = useState("")
    const [commentModal, setCommentModal] = useState(false)
    const [postComments, setPostComments] = useState([])

    useEffect(() => {
        getComments()
    }, [postComments])

    //kanchum e comment komponenty
    const showAllComments = (comments, post) => {
        return comments.length > 0 ? <>
            {
                comments.map((comment, index) => {
                    return <Comment comment={comment} getComments={getComments} post={post} key={comment?.id} />
                })
            }
        </> : <p className="canBeFirst" >Your comment can be first!</p>
    }


    //send comment
    const onSubmit = (event) => {
        console.log(idPost)
        event.preventDefault()
        axios.post("https://socialreading.xyz/comments/", { body: value, quote: idPost },
            { headers: { "Authorization": userToken } }
        ).then((resp) => {
            setCommentModal(true)
            setValue("")
            getComments(idPost)
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


    //   get and show comments
    const getComments = (post_id) => {
        post_id && axios.get("https://socialreading.xyz/quotes/" + post_id).then((resp) => {
            setPostComments(resp.data.comments)
        })
    }

    //download post
    const [downloadPost, setDownloadPost] = useState(false)

    function download(id) {
        setDownloadPost(true)
        setPostIdforMenu(false)
        htmlToImage.toJpeg(document.getElementById(id))
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = 'post.jpeg';
                link.href = dataUrl;
                link.click();
                setLessMore(false)
                setDownloadPost(false)
            })
    }
    //less more text
    const [lessMore, setLessMore] = useState(false);

    // edit quote
    const [editor, setEditor] = useState(false)
    const [textStyle, setTextStyle] = useState({ color: "black", font: "", hedline: "", background: "white", size: "16px" })
    const [quoteText, setQuoteText] = useState("")
    const [id, setId] = useState("")

    // edit post
    function editPost(id, style, text) {
        setEditor(true)
        setQuoteText(text)
        setId(id)
        setTextStyle(style)
    }

    //like
    function like(id) {
        axios.post("https://socialreading.xyz/likes/", {
            quote: id
        }, {
            headers: { "Authorization": userToken }
        }
        ).then(res => {
            console.log(res)
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
    }

    //unlike
    function unlike(id) {
        axios.delete("https://socialreading.xyz/likes/" + id).then(res => {
            console.log(res)
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
    }

    //save
    function save(id) {
        axios.post("https://socialreading.xyz/save/", {
            quote: id
        }, {
            headers: { "Authorization": userToken }
        }
        ).then(res => {
            console.log(res)
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
    }

    //unsave
    function unSave(id) {
        axios.delete("https://socialreading.xyz/save/" + id).then(res => {
            console.log(res)
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
    }
    
    //delete post
    function deletePost(postId) {
        axios.delete("https://www.socialreading.xyz/quotes/" + postId).then(resp => {
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
    }

    //post id for post menu
    const [postIdforMenu, setPostIdforMenu] = useState(false)
    return (
        <>
            {post?.is_active &&
                <div className="post__item">
                    <div className="post__header">
                        <div className="post__user">
                            <div>
                                <img alt="avatar"
                                    className="user_avatar"
                                    src={post?.author?.avatar}
                                />
                            </div>
                            <div>
                                <p className="name">{post?.author?.first_name} {post?.author?.last_name}</p>
                                <p className="time">{post?.date_posted}</p>
                            </div>
                        </div>
                        {userToken &&
                            <div className="more_div">
                                <button onClick={(ev) => {
                                    ev.stopPropagation()
                                    setPostIdforMenu(!postIdforMenu)
                                    setLessMore(true)
                                }}
                                >{postIdforMenu ? <span>x</span> : <span>...</span>}</button>
                                {
                                    postIdforMenu && <>
                                        <div className="overlay_post_menu" onClick={() => setPostIdforMenu(false)}></div>
                                        <div className="post_modal_menu">
                                            <button onClick={() => {
                                                download(post?.id)
                                            }
                                            }>Download post</button>
                                            {user?.id === post?.author?.id && <>
                                                <button
                                                    onClick={() => {
                                                        editPost(post?.id, JSON.parse(post?.styles), post?.quote_text)
                                                        setPostIdforMenu(false)
                                                    }}
                                                >Edit</button>
                                                <button onClick={() => {
                                                    deletePost(post?.id)
                                                }}>Delete</button>
                                            </>

                                            }
                                        </div>
                                    </>

                                }
                            </div>
                        }
                    </div>
                    <div className="quote_info">
                        {post?.quote_title}  / {post?.book_author} / {post?.book_category}
                    </div>
                    <div className="post__text"
                        style={{
                            color: JSON.parse(post?.styles)?.color,
                            backgroundColor: JSON.parse(post?.styles)?.background,
                            fontFamily: JSON.parse(post?.styles)?.font,
                            fontSize: JSON.parse(post?.styles)?.size + "px"
                        }}
                        id={post?.id}
                    >
                        {
                            post?.quote_text.length > 400 ? (
                                <>
                                    {lessMore ? <span>{post?.quote_text}&nbsp;
                                        {
                                            !downloadPost && <button
                                                className="show_more_less"
                                                onClick={() => {
                                                    setLessMore(false);
                                                }}>Show less</button>
                                        }
                                    </span> : <span> {post?.quote_text?.substring(0, 400)}...&nbsp;
                                        <button className="show_more_less" onClick={() => {
                                            setLessMore(true);
                                        }
                                        }>Show more</button>
                                    </span>
                                    }
                                </>
                            ) : (<span>{post?.quote_text}</span>)
                        }
                    </div>
                    <div className="about_post_section">
                        <p className="likes_count">{post?.likes?.length} likes</p>
                    </div>
                    {
                        userToken &&
                        <>
                            <div className="post_footer">
                                <>
                                    <div className="left_buttons">
                                        {
                                            !post?.likes?.find(like => like?.user?.id === user?.id) ? <button onClick={() => like(post?.id)}>
                                                <svg width="18" height="14" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.807 2.40351C9.7193 0.947368 7.96491 0 6 0C2.68421 0 5.96046e-08 2.68421 5.96046e-08 6C5.96046e-08 12.0702 4.7193 15.9825 7.45614 17.7193C9.14035 18.807 10.8596 18.807 12.5439 17.7193C15.2807 15.9825 20 12.0702 20 6C20 2.68421 17.3158 0 14 0C12.0351 0 10.2807 0.947368 9.19298 2.40351C9.07018 2.5614 9 2.77193 9 3C9 3.54386 9.45614 4 10 4C10.3333 4 10.614 3.8421 10.807 3.59649C11.5789 2.5614 12.614 2 14 2C16.3333 2 18 3.66667 18 6C18 11.0877 14.0526 14.386 11.4561 16.0351C10.3509 16.7544 9.64912 16.7544 8.54386 16.0351C5.94737 14.386 2 11.0877 2 6C2 3.66667 3.66667 2 6 2C7.38596 2 8.42105 2.5614 9.19298 3.59649C9.38597 3.8421 9.66667 4 10 4C10.5439 4 11 3.54386 11 3C11 2.77193 10.9298 2.5614 10.807 2.40351Z" fill="#3D424E" />
                                                </svg>&nbsp;Like
                                            </button> : <button onClick={() => {
                                                let a = post?.likes?.find(like => {
                                                    if (like?.user?.id === user?.id) {
                                                        return like?.id
                                                    }
                                                })
                                                unlike(a?.id)
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                                </svg>&nbsp;Like
                                            </button>
                                        }
                                        <button onClick={() => {
                                            setPostComments([])
                                            setCommentModal(!commentModal)
                                            getComments(post?.id)
                                            if (idPost) {
                                                setIdPost("")
                                            } else setIdPost(post?.id)
                                        }}>
                                            <svg width="18" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10 2C14.5439 2 18 5.45614 18 10C18 14.5439 14.5439 18 10 18C8.40351 18 7.03509 17.5789 5.75439 16.7895L2.38596 17.6316C2.36842 17.6316 2.36842 17.6316 2.36842 17.614L3.21053 14.2456C2.42105 12.9649 2 11.5965 2 10C2 5.45614 5.45614 2 10 2ZM10 -4.76837e-07C4.47368 -4.76837e-07 5.96046e-08 4.47368 5.96046e-08 10C5.96046e-08 11.614 0.403509 13.1754 1.07018 14.5263L0.438596 17.1579C0.0877194 18.614 1.38596 19.9123 2.84211 19.5614L5.47368 18.9298C6.82456 19.5965 8.38597 20 10 20C15.5263 20 20 15.5263 20 10C20 4.47368 15.5263 -4.76837e-07 10 -4.76837e-07ZM6 8.66667C5.26316 8.66667 4.66667 9.26316 4.66667 10C4.66667 10.7368 5.26316 11.3333 6 11.3333C6.73684 11.3333 7.33333 10.7368 7.33333 10C7.33333 9.26316 6.73684 8.66667 6 8.66667ZM10 8.66667C9.26316 8.66667 8.66667 9.26316 8.66667 10C8.66667 10.7368 9.26316 11.3333 10 11.3333C10.7368 11.3333 11.3333 10.7368 11.3333 10C11.3333 9.26316 10.7368 8.66667 10 8.66667ZM14 8.66667C13.2632 8.66667 12.6667 9.26316 12.6667 10C12.6667 10.7368 13.2632 11.3333 14 11.3333C14.7368 11.3333 15.3333 10.7368 15.3333 10C15.3333 9.26316 14.7368 8.66667 14 8.66667Z" fill="#3D424E" />
                                            </svg>&nbsp;Comment
                                        </button>
                                        <button>
                                            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M0.460145 11.8193C0.238562 11.5895 0.186703 11.2447 0.330908 10.9599L1.03241 9.57451C2.69268 6.29569 6.05563 4.22905 9.73084 4.22905H10.0757C10.1009 3.68267 10.1334 3.13654 10.1731 2.59081L10.241 1.66018C10.2961 0.903355 11.14 0.480287 11.7795 0.888869C13.8771 2.22923 15.7007 3.95632 17.153 5.97808L17.6091 6.61302C17.797 6.87449 17.797 7.22667 17.6091 7.48814L17.153 8.12308C15.7007 10.1448 13.8771 11.8719 11.7795 13.2123C11.14 13.6209 10.2961 13.1978 10.241 12.441L10.1731 11.5103C10.1256 10.8586 10.0886 10.2063 10.0619 9.55373C7.91207 9.49166 5.76486 9.92558 3.7915 10.8364L1.31431 11.9797C1.02447 12.1134 0.681728 12.0491 0.460145 11.8193ZM2.67839 9.69804L3.16291 9.47442C5.57405 8.36159 8.21958 7.89178 10.8447 8.09341C11.227 8.12277 11.5256 8.43577 11.5369 8.81904C11.5624 9.6804 11.6065 10.5414 11.6692 11.4013L11.6746 11.4757C13.3181 10.3141 14.7583 8.8857 15.9348 7.24795L16.0766 7.05058L15.9348 6.85321C14.7583 5.21546 13.3181 3.78707 11.6746 2.62541L11.6692 2.69987C11.6132 3.46747 11.5721 4.23589 11.5458 5.00469C11.532 5.40869 11.2005 5.72905 10.7962 5.72905L9.73084 5.72905C6.83352 5.72905 4.16555 7.24695 2.67839 9.69804Z" fill="#3D424E" />
                                            </svg>&nbsp;Share
                                        </button>
                                    </div>
                                    <div>
                                        {
                                            !post?.save_users?.find(save => save?.user?.id === user?.id) ? <button onClick={() => save(post?.id)}>
                                                <svg width="18" height="14" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2 19V4C2 2.73684 2.73684 2 4 2H12C13.2632 2 14 2.73684 14 4V19C14 19.5439 14.4561 20 15 20C15.5439 20 16 19.5439 16 19V4C16 1.75439 14.2456 -4.76837e-07 12 -4.76837e-07H4C1.75439 -4.76837e-07 1.19209e-07 1.75439 1.19209e-07 4V19C1.19209e-07 19.5439 0.456141 20 1 20C1.54386 20 2 19.5439 2 19ZM15.4912 18.1404L8 13.8421L0.508772 18.1404C0.210526 18.2982 1.19209e-07 18.6316 1.19209e-07 19C1.19209e-07 19.5439 0.456141 20 1 20C1.17544 20 1.35088 19.9474 1.49123 19.8596L8 16.1579L14.5088 19.8596C14.6491 19.9474 14.8246 20 15 20C15.5439 20 16 19.5439 16 19C16 18.6316 15.7895 18.2982 15.4912 18.1404Z" fill="#3D424E" />
                                                </svg>
                                            </button> : <button onClick={() => {
                                                let a = post?.save_users?.find(save => {
                                                    if (save?.user?.id === user?.id) {
                                                        return save?.id
                                                    }
                                                })
                                                unSave(a?.id)
                                            }
                                            }>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-fill" viewBox="0 0 16 16">
                                                    <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
                                                </svg>
                                            </button>
                                        }
                                    </div>
                                </>
                            </div>
                            <div className="comment_always">
                                <img alt="avatar"
                                    className="add_comment_avatar"
                                    src={user?.avatar}
                                />
                                <form onSubmit={onSubmit}>
                                    <input className="add_comment_input"
                                        value={value}
                                        placeholder="Write a comment..."
                                        onClick={() => {
                                            setIdPost(post?.id)
                                        }}
                                        onChange={(e) => setValue(e.target.value)} />
                                </form>
                            </div>
                            {
                                idPost && commentModal && <div style={{
                                    padding: " 20px",
                                    overflowY: "auto",
                                    maxHeight: "500px",
                                }}>
                                    {showAllComments(postComments, post)}
                                </div>
                            }
                        </>
                    }
                </div>
            }
            {/* text Editor */}
            {
                editor && <EditPost
                    id={id}
                    quoteText={quoteText}
                    textStyle={textStyle}
                    setTextEditor={setEditor}
                    setTextStyle={setTextStyle}
                    setQuoteText={setQuoteText}
                    setPost={setPost}
                />
            }
        </>

    );
}

export default Post