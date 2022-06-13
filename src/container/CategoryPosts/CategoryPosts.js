
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Post from "../../components/Post/Post"
import "./categoryPosts.css"
// import Parser from 'html-react-parser';
{/* <td>{Parser(a)}</td> */ }

function CategoryPosts() {
    const params = useParams()
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        console.log(params.name);
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) {
        axios.get("https://socialreading.xyz/quotes/?author_id=" + user.id + "&id=&category=" + params.name).then(resp => {
            console.log(resp.data);
            setPosts(resp.data)
        }).catch((error) => {
            if (error.response) {
                console.log("error.response ", error.response);
            } else if (error.request) {
                console.log("error.request ", error.request);
            } else if (error.message) {
                console.log("error.request ", error.message);
            }
        });
        } else {
            navigate("/")
        }
    }, [params.name])
    return (<div className="posts_in_my_category">
        <h1>{params.name}</h1>
        <div className="">
        {
            posts?.map(post => {
                return <Post post={post} key={post?.id}></Post>
            })
        }

        </div>
      
    </div>)
}

export default CategoryPosts