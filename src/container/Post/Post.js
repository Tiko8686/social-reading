import axios from "axios";
import { useEffect, useState } from "react";
import "./post.css"
function Post() {
  const [userPosts, setUserPosts] = useState("")
  useEffect(() => {
    const userGoogle = JSON.parse(localStorage.getItem("userGoogle"));
    const userFb = JSON.parse(localStorage.getItem("userFb"));
    const userInfo = JSON.parse(localStorage.getItem("user"))
    if (userInfo) {
      axios.get("https://www.socialreading.xyz/quotes/?author_id=" + userInfo.id).then((resp) => {
        setUserPosts(resp);
      })
    }else if (userGoogle) {
      axios.get("https://www.socialreading.xyz/quotes/?author_id=" + userGoogle.id).then((resp) => {
        setUserPosts(resp);
      })
    }else if(userFb){
      axios.get("https://www.socialreading.xyz/quotes/?author_id=" + userFb.id).then((resp) => {
        setUserPosts(resp);
      })
    }
  }, [])

  return (
    <>
      <div className="profile_post">
        {userPosts?.data?.map((post) => (
          <div className="post">
            <img src={post.quote_file} className="post_img" />
          </div>
        ))}
      </div>
    </>

  );
}

export default Post