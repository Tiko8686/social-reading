import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../../components/Post/Post";
import "./saved.css"
function Saved() {
  const [saved, setSaved] = useState([])
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    axios.get("https://www.socialreading.xyz/save/?id=" + user?.id).then(resp => {
      console.log(resp.data)
      // setSaved(resp.data)
      // for (let )
      for (let e of resp.data) {
        console.log(e)
        axios.get("https://www.socialreading.xyz/quotes/" + e?.quote).then(resp => {
          console.log(resp.data)
          setSaved([...saved, resp.data])
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
  console.log(saved)

  return (
    <>
      <div className="saved_list">
        {
          saved?.map(e => {
            return (
              <Post post={e} key={e?.id} setSaved={setSaved}/>

            )
          })
        }
      </div>
    </>

  );
}

export default Saved