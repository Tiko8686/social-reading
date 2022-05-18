import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./profile.css";

function Profile() {
    const [userInfo, setUserInfo] = useState("");
    const [userGoogle, setUserGoogle] = useState("");
    const [userFb, setUserFb] = useState("");

    const navigate = useNavigate();
    useEffect(() => {
        console.log("aaaa")
        setUserInfo(JSON.parse(localStorage.getItem("user")));
        const token = JSON.parse(localStorage.getItem("token"));
        const tokenGoogle = JSON.parse(localStorage.getItem("tokenGoogle"));
        const tokenFb = JSON.parse(localStorage.getItem("tokenFb"));
        setUserGoogle(JSON.parse(localStorage.getItem("userGoogle")));
        setUserFb(JSON.parse(localStorage.getItem("userFb")));
        if (!token && !tokenGoogle && !tokenFb) {
            navigate("/");
        }
    }, []);

    const [modal, setModal] = useState(false);
    return (
        <>
            <div className="profilePage">
                <div className="profile_background">
                    {
                        userInfo.profile_background ?
                            (<img
                                className="background_pic"
                                src={userInfo.profile_background}
                                alt="background_pic"
                            />)
                            : userGoogle.profile_background ? (
                                <img
                                    className="background_pic"
                                    src={userGoogle.profile_background}
                                    alt="background_pic"
                                />
                            ) : userFb.profile_background ? (
                                <img
                                    className="background_pic"
                                    src={userFb.profile_background}
                                    alt="background_pic"
                                />
                            )
                                : ""
                    }
                    <button className="bi bi-camera edit_cover_photo_button">&nbsp;&nbsp;&nbsp;Add cover Photo</button>
                </div>
                <div className="my_info">
                    <div className="name_and_pic">
                        <div className="pic_div">
                            {userInfo ? (
                                <img
                                    className="autor_pic"
                                    src={userInfo.avatar}
                                    alt="profile_pic"
                                />
                            ) : userGoogle ? (
                                <img
                                    className="autor_pic"
                                    src={userGoogle.avatar_google}
                                    alt="profile_pic"
                                />
                            ) : userFb ? (
                                <img
                                    className="autor_pic"
                                    src={userFb.avatar_facebook}
                                    alt="profile_pic"
                                />
                            ) : (
                                ""
                            )}
                            <label for="profile_photo" className="bi bi-camera edit_profile_pic"></label>
                            <input type="file" id="profile_photo" />
                        </div>
                        <div className="nameSurnameDiv">
                            <h3>
                                {userInfo
                                    ? userInfo.first_name + " " + userInfo.last_name
                                    : userGoogle
                                        ? userGoogle.first_name + " " + userGoogle.last_name
                                        : userFb
                                            ? userFb.first_name + " " + userFb.last_name
                                            : ""}
                            </h3>
                        </div>
                    </div>
                    <div>
                        <Link to="edit-profile">
                            <button className="edit_btn bi bi-pencil" onClick={() => {
                                console.log(userInfo);
                            }}>
                                &nbsp; Edit profile
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="profile_menu">
                    <ul className="profile_menu_list">
                        <li>
                            <Link to="post">Posts</Link>
                        </li>
                        <li>
                            <Link to="category">Categories</Link>
                        </li>
                        <li>
                            <Link to="saved">Saved</Link>
                        </li>
                    </ul>
                    <ul>
                        <li onClick={() => setModal(!modal)} className="more_btn">
                            ...
                        </li>
                        {modal && (
                            <ul
                                className="modal_menu_profile"
                                onClick={() => setModal(false)}
                            >
                                <li>
                                    <Link to="/settings" className="bi bi-gear settings">
                                        &nbsp; Settings
                                    </Link>
                                </li>
                                <li>
                                    <img
                                        alt="pol"
                                        src="https://social-reading-application.herokuapp.com/images/privace_policy.png"
                                        className="privace_poilcy"
                                    />
                                    <Link to="/privacePolicy" className="privace_poilcy_txt">
                                        &nbsp; Privace Policy
                                    </Link>
                                </li>
                                <li>
                                    <img
                                        alt="logout"
                                        src="https://social-reading-application.herokuapp.com/images/LogOut.png"
                                        className="log_out_img"
                                    />
                                    <button
                                        onClick={() => {
                                            localStorage.removeItem("token");
                                            localStorage.removeItem("user");
                                            localStorage.removeItem("tokenGoogle");
                                            localStorage.removeItem("userGoogle");
                                            localStorage.removeItem("tokenFb");
                                            localStorage.removeItem("userFb");
                                            navigate("/");
                                            window.location.reload();
                                        }}
                                        className="log_out"
                                    >
                                        &nbsp; Log Out
                                    </button>
                                </li>
                            </ul>
                        )}
                    </ul>
                </div>
            </div>
            <Outlet />
        </>
    );
}

export default Profile;
