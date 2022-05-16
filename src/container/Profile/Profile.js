import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./profile.css"

function Profile() {
    const navigate = useNavigate()
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        const tokenGoogle = JSON.parse(localStorage.getItem('tokenGoogle'));
        const tokenFb = JSON.parse(localStorage.getItem('tokenFb'));

        if (!token &&  !tokenGoogle && !tokenFb) {
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
            localStorage.removeItem("userGoogle")

            localStorage.removeItem("tokenFb")
            localStorage.removeItem("userFb")
            navigate("/")
            window.location.reload()
        }}>Log out</button>
    </div>
    );
}

export default Profile;