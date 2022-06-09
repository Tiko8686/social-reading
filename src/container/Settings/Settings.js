import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


function Settings() {
  // const navigate = useNavigate()
  // useEffect(() => {
  //   const token = JSON.parse(localStorage.getItem("token"));
  //   // const tokenGoogle = JSON.parse(localStorage.getItem("tokenGoogle"));
  //   // const tokenFb = JSON.parse(localStorage.getItem("tokenFb"));

  //   if (!token) {
  //     navigate("/")
  //   }
  // }, [])
  const [userToken, setUserToken] = useState("");
  const [current_password, setCurrent_password] = useState("")
  const [modal, setModal] = useState({
    sure: false,
    password: false
  })
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      setUserToken("JWT " + token.access)
    }
  }, []);
  const password_input_value = (event) => {
    setCurrent_password(event.target.value)
    console.log(current_password);
  }
  const deleteAcc = () => {
    console.log(userToken);
    const formData = new FormData();
    formData.append("current_password", current_password);

    axios.get("https://socialreading.xyz/auth/users/me/",  
    // formData,
    {headers: { "Authorization": userToken }}
    ).then((resp) => {
      console.log(resp);
    })
  }
  return (
    <>
      <div>
        <button onClick={() => setModal({
          sure: true,
        })}>delete acc</button>
        {modal.sure &&
          <div className="modal">
            <div class="overlay" onClick={() => {
              setModal({
                sure: false,
                password: false
              })
            }}></div>
            <div className="modal-content">
              <p>Are you sure</p>
              <button onClick={() => setModal({
                sure: false,
                password: true
              })}>Yes</button>
              <button onClick={() => {
                setModal({
                  sure: false,
                  password: false
                })
              }}>No</button>
            </div>
          </div>
        }
        {modal.password &&
          <div className="modal">
            <div class="overlay" onClick={() => {
              setModal({
                sure: false,
                password: false
              })
            }}></div>
            <div className="modal-content">
              <input onChange={(e) => password_input_value(e)} />
              <button onClick={() => deleteAcc()}>delete</button>
            </div>
          </div>}
      </div>
    </>

  );
}

export default Settings;
