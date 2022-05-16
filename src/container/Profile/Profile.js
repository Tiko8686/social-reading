// // import axios from "axios";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";


// function Profile() {
//     const navigate = useNavigate()
//     useEffect(() => {
//         const token = JSON.parse(localStorage.getItem('token'));
//         const tokenGoogle = JSON.parse(localStorage.getItem('tokenGoogle'));

//         // setToken(tokenn)
//         if (!token) {
//             navigate("/")
//          }
//         // else if(!tokenGoogle){
//         //     navigate("/")
//         // }

//     }, [])

//         // setInterval(() => {
//         // axios.post("https://socialreading.xyz/auth/djoser/jwt/refresh", { refresh: tokenn.refresh }).
//         //     then(resp => {
//         //         let a = "JWT " + resp.data.access
//         //         axios.get("https://socialreading.xyz/auth/users/me", { headers: { "Authorization": a } })
//         //             .then(response => {
//         //                 console.log("act", response.data)
//         //             }).catch((error) => {
//         //                 if (error.response) {
//         //                     console.log("error.response ", error.response);
//         //                 } else if (error.request) {
//         //                     console.log("error.request ", error.request);
//         //                 } else if (error.message) {
//         //                     console.log("error.message ", error.message);
//         //                 }
//         //             });
//         //         console.log(resp.data)
//         //     }).catch((error) => {
//         //         if (error.response) {
//         //             console.log("error.response ", error.response);
//         //             alert(error.response.data.email)
//         //         } else if (error.request) {
//         //             console.log("error.request ", error.request);
//         //         } else if (error.message) {
//         //             console.log("error.message ", error.message);
//         //         }
//         //     });
//         // }, 240000);

//     return (
//         <>
//             <div>
//                 <h1>Profile</h1>
//                 <button onClick={() => {
//                     localStorage.removeItem("token")
//                     localStorage.removeItem("user")
//                     localStorage.removeItem("tokenGoogle")
//                     window.location.reload()
//                     navigate("/")
//                 }}>Log out</button>
//             </div>
//         </>


//     );
// }

// export default Profile;
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./profile.css"

function Profile() {
    const navigate = useNavigate()
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        const tokenGoogle = JSON.parse(localStorage.getItem('tokenGoogle'));
        const tokenFb = JSON.parse(localStorage.getItem('tokenFb'));

        if (!token) {
            navigate("/")
        } else if (!tokenGoogle){
            navigate("/")
        }else if(!tokenFb){
            navigate("/")
        }
    }, [])
    return (<div className="profilePage" >
        <div className="profile_background" >
        </div>
        <div className="my_info" >
            <div className="name_and_pic">
                <div className="pic_div" >
                    <div className="autor_pic" ></div>
                </div>
                <div className="nameSurnameDiv">
                    <h3> Name Surname </h3>
                    <p> @username </p>
                </div>
            </div>

            <div >
                <button className="edit_btn" > Խմբագրել </button>
            </div>
        </div>
        <div className="profile_menu" >
            <ul className="profile_menu_list" >
                <li >
                    <Link to="#">Photos</Link>
                </li>
                <li >
                    <Link to="#">Saved</Link>
                </li>
                <li >
                    <Link to="#">Favorites</Link>
                </li>
            </ul>
            <ul >
                <li >...</li>
                <ul>
                    <li>Notfication</li>
                    <li>Messages</li>
                    <li>Settings</li>
                </ul>
            </ul>
        </div>
        <button onClick={() => {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            localStorage.removeItem("tokenGoogle")
            navigate("/")
            window.location.reload()
        }}>Log out</button>
    </div>
    );
}

export default Profile;