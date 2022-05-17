import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./profile.css"

function Profile() {
    const [userInfo, setUserInfo] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        setUserInfo(JSON.parse(localStorage.getItem("user")))
        const token = JSON.parse(localStorage.getItem('token'));
        const tokenGoogle = JSON.parse(localStorage.getItem('tokenGoogle'));
        const tokenFb = JSON.parse(localStorage.getItem('tokenFb'));

        if (!token && !tokenGoogle && !tokenFb) {
            navigate("/")
        }
        console.log(userInfo);
    }, [])
    const [modal, setModal] = useState(false)
    return (<>
        <div className="profilePage" >
            <div className="profile_background" >
            </div>
            <div className="my_info" >
                <div className="name_and_pic">
                    <div className="pic_div" >
                        <img className="autor_pic" src={userInfo.avatar} />
                    </div>
                    <div className="nameSurnameDiv">
                        <h3> {userInfo.first_name + " " + userInfo.last_name}  </h3>
                    </div>
                </div>
                <div>
                    <button className="edit_btn bi bi-pencil">&nbsp; Edit profile</button>
                </div>
            </div>
            <div className="profile_menu" >
                <ul className="profile_menu_list">
                    <li >
                        <Link to="post">Posts</Link>
                    </li>
                    <li >
                        <Link to="category">Categories</Link>
                    </li>
                    <li >
                        <Link to="saved">Saved</Link>
                    </li>
                </ul>
                <ul >
                    <li onClick={() => setModal(!modal)} className="more_btn">...</li>
                    {modal &&
                        <ul className="modal_menu_profile" onClick={() => setModal(false)}>
                            <li>
                                <Link to="/settings" className="bi bi-gear settings">&nbsp; Settings</Link>
                            </li>
                            <li>
                                <img src="http://localhost:3000/images/privace_policy.png" className="privace_poilcy" />
                                <Link to="/privacePolicy" className="privace_poilcy_txt">
                                &nbsp; Privace Policy</Link>
                            </li>
                            <li>
                                <img src="http://localhost:3000/images/LogOut.png" className="log_out_img" />
                                <button onClick={() => {
                                    localStorage.removeItem("token")
                                    localStorage.removeItem("user")
                                    localStorage.removeItem("tokenGoogle")
                                    localStorage.removeItem("userGoogle")
                                    localStorage.removeItem("tokenFb")
                                    localStorage.removeItem("userFb")
                                    navigate("/")
                                    window.location.reload()
                                }}
                                    className="log_out">
                                    &nbsp; Log Out
                                </button>
                            </li>
                        </ul>
                    }
                </ul>
            </div>

        </div>
        <Outlet />
    </>
    );
}

export default Profile;