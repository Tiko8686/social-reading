import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../../components/Post/Post";
import "./posts.css"


function Posts() {
  const navigate = useNavigate()
  const [userPosts, setUserPosts] = useState([]);

  function getMyPosts() {
    const user = JSON.parse(localStorage.getItem("user"))
    axios.get("https://www.socialreading.xyz/quotes/?author_id=" + user?.id).then(resp => {
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
  }


  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"))

    if (userInfo) {
      getMyPosts()
    } else {
      navigate("/")
    }

  }, [])




  return (
    <div className="my_post">
      {
        userPosts?.map(post => {
          return (
            <Post post={post} key={post?.id} getMyPosts={getMyPosts} />
          )
        })
      }
    </div>

  );
}

export default Posts