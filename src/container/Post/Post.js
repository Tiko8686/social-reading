import axios from "axios";
import { useEffect, useState } from "react";
import "./post.css"
function Post() {
  const [userPosts, setUserPosts] = useState("")
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"))
    axios.get("https://www.socialreading.xyz/quotes/?author_id=" + userInfo.id).then((resp) => {
      setUserPosts(resp);
    })
  }, [])

  return (
    <>
      <div className="profile_post">
        {userPosts?.data?.map((post) => (
          <div className="post">
            <img src={post.quote_file} className="post_img"/>
          </div>
        ))}
      </div>
    </>

  );
}

export default Post