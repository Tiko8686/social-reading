import axios from "axios";
import { useEffect, useState } from "react";

function Saved() {
  const [saved, setSaved] = useState([])
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user)
    axios.get("https://www.socialreading.xyz/quotes/?author_id=&save=" + user.id).then(resp => {
      console.log(resp)
      setSaved(resp.data)
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
    <>
      <div >
        <h1>Saved</h1>
        {saved}
      </div>
    </>

  );
}

export default Saved