import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./comment.css";

function Comment({ comment }) {
    const [user, setUser] = useState("");
    const [userToken, setUserToken] = useState("");
    const [optionsModal, setOptionsModal] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [replyModal, setReplyModal] = useState(false)
    const [replyComment, setReplyComment] = useState("")
    const [editingCommentValue, setEditingCommentValue] = useState("")
    const [replyId, setReplyId] = useState("")

    // create token
    useEffect(() => {
        console.log(comment.children);
        setUser(JSON.parse(localStorage.getItem("user")));
        const token = JSON.parse(localStorage.getItem("token"));
        if (token) {
            setUserToken("JWT " + token.access)
        }
    }, []);

    // delete
    const deleteComment = (id) => {
        axios.delete("https://socialreading.xyz/comments/" + id).then((resp) => {
            console.log(resp);
        })
    }

    // edit
    const doneEditing = (id, event) => {
        setIsEditing(false)
        event.preventDefault()
        axios.patch("https://socialreading.xyz/comments/" + id + "/", { body: editingCommentValue }).then((resp) => {
            console.log(resp);
        })
    }
    const replaySubmit = (e) => {
        e.preventDefault()
        axios.post("https://socialreading.xyz/comments/", { body: replyComment, parent: replyId, quote: comment?.quote },
            { headers: { "Authorization": userToken } }
        ).then((resp) => {
        });
    }
    return (

        <div className={!comment?.parent ? 'comment' : "children"}>
            <div className='comment_info'>
                <img src={comment?.user?.avatar} className="add_comment_avatar" />
                <div className='name_and_body'>
                    <p className='username'>{comment?.user?.first_name} {comment?.user?.last_name}</p>
                    {!isEditing ?
                        <p className='comment_body'>{comment?.body}</p>
                        :
                        <form onSubmit={(e) => doneEditing(comment?.id, e)}>
                            <input
                                className='edit_comment_input'
                                value={editingCommentValue}
                                onChange={(e) => { setEditingCommentValue(e.target.value) }}
                            />
                            <input type="submit" value="done" />
                        </form>
                    }
                </div>
                <div>
                    {user?.id === comment?.user?.id && <button className='comment_options' onClick={() => setOptionsModal(!optionsModal)}>...</button>}
                    {optionsModal && <div className='comment_options_modal'>
                        <div className='comment_options_buttons'>

                            {/* edit */}
                            <button className='comment_edit_btn' onClick={() => {
                                setIsEditing(true)
                                setOptionsModal(false)
                                setEditingCommentValue(comment?.body)
                            }}>Edit</button>

                            {/* delete */}
                            <button className='comment_delete_btn' onClick={() => {
                                deleteComment(comment?.id)
                                setOptionsModal(false)
                            }}>Delete</button>
                        </div>
                    </div>}
                </div>
            </div>
            {/* reply */}
            <p onClick={() => { setReplyModal(!replyModal) }}>Reply</p>
            {replyModal &&
                <form onSubmit={(e) => replaySubmit(e)}>
                    <input
                        onClick={() => setReplyId(comment?.id)}
                        value={replyComment}
                        onChange={(e) => { setReplyComment(e.target.value) }}
                    />
                </form>}

                {/* {comment?.child.length > 0 && comment?.children?.map((child)=>{
                    <Comment comment={child} />
                })} */}
        </div>
    )
}
export default Comment