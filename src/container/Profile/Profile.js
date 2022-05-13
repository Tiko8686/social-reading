// import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Profile() {
    const navigate = useNavigate()
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        const tokenGoogle = JSON.parse(localStorage.getItem('tokenGoogle'));

        // setToken(tokenn)
        if (!token) {
            navigate("/")
         }
        // else if(!tokenGoogle){
        //     navigate("/")
        // }
        
    }, [])
    
        // setInterval(() => {
        // axios.post("https://socialreading.xyz/auth/djoser/jwt/refresh", { refresh: tokenn.refresh }).
        //     then(resp => {
        //         let a = "JWT " + resp.data.access
        //         axios.get("https://socialreading.xyz/auth/users/me", { headers: { "Authorization": a } })
        //             .then(response => {
        //                 console.log("act", response.data)
        //             }).catch((error) => {
        //                 if (error.response) {
        //                     console.log("error.response ", error.response);
        //                 } else if (error.request) {
        //                     console.log("error.request ", error.request);
        //                 } else if (error.message) {
        //                     console.log("error.message ", error.message);
        //                 }
        //             });
        //         console.log(resp.data)
        //     }).catch((error) => {
        //         if (error.response) {
        //             console.log("error.response ", error.response);
        //             alert(error.response.data.email)
        //         } else if (error.request) {
        //             console.log("error.request ", error.request);
        //         } else if (error.message) {
        //             console.log("error.message ", error.message);
        //         }
        //     });
        // }, 240000);
 
    return (
        <>
            <div>
                <h1>Profile</h1>
                <button onClick={() => {
                    localStorage.removeItem("token")
                    localStorage.removeItem("user")
                    localStorage.removeItem("tokenGoogle")
                    window.location.reload()
                    navigate("/")
                }}>Log out</button>
            </div>
        </>


    );
}

export default Profile;
