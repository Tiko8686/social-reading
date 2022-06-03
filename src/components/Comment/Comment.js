import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./comment.css";

function Comment({ comment, getComments, post }) {
    const [user, setUser] = useState("");
    const [userToken, setUserToken] = useState("");
    const [optionsModal, setOptionsModal] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [replyModal, setReplyModal] = useState(false)
    const [replyComment, setReplyComment] = useState("")
    const [editingCommentValue, setEditingCommentValue] = useState("")
    const [replyId, setReplyId] = useState("")
    const [childrenId, setChildrenId] = useState([])

    // create token
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")));
        const token = JSON.parse(localStorage.getItem("token"));
        if (token) {
            setUserToken("JWT " + token.access)
        }
    }, []);
    const [com, setCom] = useState("")

    // delete
    const deleteComment = (id) => {
        axios.delete("https://socialreading.xyz/comments/" + id).then((resp) => {
            console.log(resp);
            getComments(post.id)
            setCom("")
        })

    }

    // edit
    const doneEditing = (id, event) => {
        setIsEditing(false)
        event.preventDefault()
        axios.patch("https://socialreading.xyz/comments/" + id + "/", { body: editingCommentValue }).then((resp) => {
            console.log(resp);
            setCom("")
            getComments(post.id)
            setEditingCommentValue("")
        })
    }

    //reply
    const replaySubmit = (e) => {
        e.preventDefault()
        axios.post("https://socialreading.xyz/comments/", { body: replyComment, parent: replyId, quote: comment?.quote },
            { headers: { "Authorization": userToken } }
        ).then((resp) => {
            setCom("")
            setReplyComment("")
            getComments(post.id)
            setReplyModal(!replyModal)
            showReplies(replyId)
        });
    }
    //showReplies
    const showReplies = (id) => {
        setChildrenId([...childrenId, id])
    }

    const showComment = (comment) => {
        return (
            <>
                <div className={!comment?.parent ? 'comment' : "children" }
                    style={
                        childrenId?.includes(comment?.parent) || !comment?.parent ? { display: "block" } : { display: "none" }
                    }
                >
                    <div className='comment_user_and_body' key={comment?.id}>
                        <img src={comment?.user?.avatar} className="add_comment_avatar" />
                        <div className='name_and_body'>
                            <p className='username'>{comment?.user?.first_name} {comment?.user?.last_name}</p>
                            {!isEditing ?
                                <p className='comment_body'>{comment?.body}</p>
                                : com === comment?.id ?
                                    <form onSubmit={(e) => doneEditing(comment?.id, e)} style={{ display: "flex", gap: "10px" }}>
                                        <input
                                            className='edit_comment_input'
                                            value={editingCommentValue}
                                            onChange={(e) => { setEditingCommentValue(e.target.value) }}
                                        />
                                        <input type="submit" value="done" className='done_btn' />
                                    </form> : ""
                            }
                            {isEditing && com !== comment?.id &&
                                <p className='comment_body'>{comment?.body}</p>
                            }
                        </div>
                        {
                            user?.id === comment?.user?.id && <button className='comment_options'
                                onClick={() => { setOptionsModal(!optionsModal); setCom(comment?.id) }}>...
                            </button>
                        }
                        {
                            optionsModal && com === comment?.id && <div className='comment_options_modal'>
                                {/* edit */}
                                <button className='comment_edit_btn' onClick={() => {
                                    setIsEditing(true)
                                    setReplyModal(false)
                                    setOptionsModal(false)
                                    setEditingCommentValue(comment?.body)
                                    setCom(comment?.id)
                                }}>Edit</button>
                                {/* delete */}
                                <button className='comment_delete_btn' onClick={() => {
                                    deleteComment(comment?.id)
                                    setOptionsModal(false)
                                }}>Delete</button>
                            </div>
                        }
                    </div>
                    <div>

                        <div className='edit_show_hide_buttons'>
                            {/* replay */}
                            {!replyModal && <button onClick={() => {
                                setReplyModal(!replyModal);
                                setCom(comment?.id);
                                setIsEditing(false)
                            }}>Reply</button>}
                            {
                                childrenId.includes(comment?.id) ? <button onClick={() => {
                                    childrenId.splice(childrenId.indexOf(comment?.id), 1);
                                    setChildrenId([...childrenId])
                                    setReplyModal(false)
                                }}><b>Hide replies</b></button> : comment?.children?.length > 0 ?
                                    <button onClick={() => {
                                        showReplies(comment?.id)
                                        setReplyModal(false)
                                    }}><b>Show replies</b></button> : ""
                            }
                        </div>
                        {replyModal && com === comment?.id &&
                            <form onSubmit={(e) => replaySubmit(e)} style={{ display: "flex", gap: "10px", paddingLeft: "65px" }}>
                                <input
                                    placeholder='Write replay...'
                                    className='reply_input'
                                    onClick={() => setReplyId(comment?.id)}
                                    value={replyComment}
                                    onChange={(e) => { setReplyComment(e.target.value) }}
                                />
                                <button type='submit' className='reply_btn'>Send reply</button>
                            </form>
                        }
                    </div>

                    {
                        comment?.children?.length > 0 && comment?.children?.map(comment => {
                            return (<>
                                {showComment(comment)}
                            </>)
                        })
                    }
                </div>

            </>

        )
    }
    return (
        <>
            {showComment(comment)}
        </>
    )
}
export default Comment