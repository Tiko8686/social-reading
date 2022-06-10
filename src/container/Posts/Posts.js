import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../../components/Post/Post";
import "./posts.css"
function Posts() {
  const navigate = useNavigate()
  const [userPosts, setUserPosts] = useState([])
  useEffect(() => {
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

    
    const token = JSON.parse(localStorage.getItem("token"))
    if (token) {
      //refresh token
      axios.get("https://socialreading.xyz/auth/users/me/", {
        headers: { Authorization: "JWT " + token.access },
      }).then((response) => {
        console.log(response.data);
      }).catch((error) => {
        if (error.response) {
          console.log("error.response ", error.response);
          if (error.response.data.detail) {
            axios.post("https://socialreading.xyz/auth/jwt/refresh/", { refresh: token.refresh }).
              then((response) => {
                console.log(response.data);
                localStorage.setItem("token", JSON.stringify({ refresh: token.refresh, access: response.data.access }))
              }).catch((error) => {
                if (error.response) {
                  console.log("error.response ", error.response);
                  if (error.response.data.detail) {
                    localStorage.removeItem("user")
                    localStorage.removeItem("token")
                  }
                } else if (error.request) {
                  console.log("error.request ", error.request);
                } else if (error.message) {
                  console.log("error.message ", error.message);
                }
              });
          }
        } else if (error.request) {
          console.log("error.request ", error.request);
        } else if (error.message) {
          console.log("error.request ", error.message);
        }
      });
    } else {
      navigate("/")
    }

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