import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../../components/Post/Post";
import "./saved.css"
function Saved() {
  const [saved, setSaved] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      getSaved()
    } else {
      navigate("/")
    }

  }, [])


  function getSaved() {
    const user = JSON.parse(localStorage.getItem("user"))

    axios.get("https://www.socialreading.xyz/save/?id=" + user?.id).then(resp => {
      let arr = []
      if (resp.data.length !== 0) {
        for (let e of resp.data) {
          axios.get("https://www.socialreading.xyz/quotes/" + e?.quote).then(resp => {
            arr.push(resp.data) 
            setSaved([...arr])
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
      } else {
        arr = []
        setSaved([])
      }
     

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

  console.log(saved)

  return (
    <>
      <div className="saved_list">
        {
          saved?.map(e => {
            return (
              <Post post={e} key={e?.id} getSaved={getSaved} />
            )
          })
        }
      </div>
    </>

  );
}

export default Saved