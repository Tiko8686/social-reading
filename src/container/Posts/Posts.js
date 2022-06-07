import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../../components/Post/Post";
import "./posts.css"
function Posts() {
  const [userPosts, setUserPosts] = useState([])
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    axios.get("https://www.socialreading.xyz/quotes/?author_id=" + user.id).then(resp => {
      console.log(resp)
      setUserPosts(resp.data)
    }).catch((error) => {
      if (error.response) {
        console.log("error.response ", error.response);
      } else if (error.request) {
        console.log("error.request ", error.request);
      } else if (error.message) {
        console.log("error.request ", error.message);
      }
    });
  }, [])

  return (
    <div className="my_post">
      {
        userPosts?.map(post => {
          return (
            <Post post={post} key={post?.id} />
          )
        })
      }
    </div>

  );
}

export default Posts