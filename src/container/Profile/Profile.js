import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./profile.css";
import { Button, Box, Slider } from "@material-ui/core";
import AvatarEditor from "react-avatar-editor";
import axios from "axios";
function Profile() {
    const [userInfo, setUserInfo] = useState("");
    const [userGoogle, setUserGoogle] = useState("");
    const [userFb, setUserFb] = useState("");
    const [token, setToken] = useState("")
    const navigate = useNavigate();
    useEffect(() => {
        const tokenn = JSON.parse(localStorage.getItem("token"));
        const tokenGoogle = JSON.parse(localStorage.getItem("tokenGoogle"));
        const tokenFb = JSON.parse(localStorage.getItem("tokenFb"));
        if (tokenn) {
            setToken("JWT " + tokenn.access)
        } else if (tokenGoogle) {
            setToken("JWT " + tokenGoogle.access)
        } else if (tokenFb) {
            setToken("JWT " + tokenFb.access)
        }

        if (!tokenn && !tokenGoogle && !tokenFb) {
            navigate("/");
        } else {
            if (JSON.parse(localStorage.getItem("user"))) {
                setUserInfo(JSON.parse(localStorage.getItem("user")));
                setPicture({ ...picture, croppedImg: JSON.parse(localStorage.getItem("user")).avatar })
            } else if (JSON.parse(localStorage.getItem("userGoogle"))) {
                setUserGoogle(JSON.parse(localStorage.getItem("userGoogle")));
                if (JSON.parse(localStorage.getItem("userGoogle")).avatar) {
                    setPicture({ ...picture, croppedImg: JSON.parse(localStorage.getItem("userGoogle")).avatar })
                } else {
                    setPicture({ ...picture, croppedImg: JSON.parse(localStorage.getItem("userGoogle")).avatar_google })
                }
            } else if (JSON.parse(localStorage.getItem("userFb"))) {
                setUserFb(JSON.parse(localStorage.getItem("userFb")));
                if (JSON.parse(localStorage.getItem("userFb")).avatar) {
                    setPicture({ ...picture, croppedImg: JSON.parse(localStorage.getItem("userFb")).avatar })
                } else {
                    setPicture({ ...picture, croppedImg: JSON.parse(localStorage.getItem("userFb")).avatar_facebook })
                }
            }
        }
    }, [navigate]);

    // change profile pic methods
    let editor = "";
    const [picture, setPicture] = useState({
        cropperOpen: false,
        img: null,
        zoom: 2,
        croppedImg: ""
    });
    const handleSlider = (event, value) => {
        setPicture({
            ...picture,
            zoom: value
        });
    };
    const handleCancel = () => {
        setPicture({
            ...picture,
            cropperOpen: false
        });
    };
    const setEditorRef = (ed) => {
        editor = ed;
    };
    const handleSave = (e) => {
        if (setEditorRef) {
            console.log(editor)
            const canvasScaled = editor.getImageScaledToCanvas();
            const croppedImg = canvasScaled.toDataURL();
            console.log("croppedImg", croppedImg)
            function dataURLtoFile(dataurl, filename) {
                var arr = dataurl.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], filename, { type: mime });
            }
            let file = dataURLtoFile(croppedImg, 'profile.png');
            const formData = new FormData();
            formData.append("avatar", file);
            axios.patch('https://socialreading.xyz/auth/users/me/', formData, {
                headers: { "Authorization": token }
            }).then(resp => {
                console.log("respo", resp)
                if (JSON.parse(localStorage.getItem("token"))) {
                    localStorage.setItem('user', JSON.stringify(resp.data));
                    setUserInfo(JSON.parse(localStorage.getItem("user")));
                    setPicture({ ...picture, croppedImg: JSON.parse(localStorage.getItem("user")).avatar, cropperOpen: false })
                } else if (JSON.parse(localStorage.getItem("tokenGoogle"))) {
                    localStorage.setItem('userGoogle', JSON.stringify(resp.data));
                    setUserGoogle(JSON.parse(localStorage.getItem("userGoogle")));
                    setPicture({ ...picture, croppedImg: JSON.parse(localStorage.getItem("userGoogle")).avatar, cropperOpen: false })
                } else if (JSON.parse(localStorage.getItem("tokenFb"))) {
                    localStorage.setItem('userFb', JSON.stringify(resp.data));
                    setUserFb(JSON.parse(localStorage.getItem("userFb")));
                    setPicture({ ...picture, croppedImg: JSON.parse(localStorage.getItem("userFb")).avatar, cropperOpen: false })
                }
                window.location.reload()
            }).catch((error) => {
                if (error.response) {
                    console.log("error.response ", error.response);
                } else if (error.request) {
                    console.log("error.request ", error.request);
                } else if (error.message) {
                    console.log("error.request ", error.message);
                }
            });
            setPicture({
                ...picture,
                img: null,
                cropperOpen: false,
                // croppedImg: croppedImg
            });
        }
    };

    // change background pic methods

    // let editorBack = "";
    // const [pictureBack, setPictureBack] = useState({
    //     cropperOpen: false,
    //     img: null,
    //     zoom: 2,
    //     croppedImg: ""
    // });
    return (
        <>
            <div className="profilePage">
                <div className="profile_background">
                    {
                        userInfo?.profile_background ?
                            (<img
                                className="background_pic"
                                src={userInfo.profile_background}
                                alt="background_pic"
                            />)
                            : userGoogle?.profile_background ? (
                                <img
                                    className="background_pic"
                                    src={userGoogle.profile_background}
                                    alt="background_pic"
                                />
                            ) : userFb?.profile_background ? (
                                <img
                                    className="background_pic"
                                    src={userFb.profile_background}
                                    alt="background_pic"
                                />
                            ) : ""
                    }
                    {/* bacground photo */}
                    <label htmlFor="cover_photo" className="bi bi-camera edit_cover_photo_button">Add cover Photo</label>
                    <input type="file" id="cover_photo"
                        // onChange={(e) => {
                        //     console.log()
                        // }}
                    />
                </div>
                <div className="my_info">
                    <div className="name_and_pic">
                        <div className="pic_div">
                            <img
                                className="autor_pic"
                                src={picture.croppedImg}
                                alt="profile_pic"
                            />
                            <label htmlFor="profile_photo" className="bi bi-camera edit_profile_pic"></label>
                            <input type="file" id="profile_photo" onChange={(e) => {
                                let url = URL.createObjectURL(e.target.files[0]);
                                console.log(url);
                                setPicture({
                                    ...picture,
                                    img: url,
                                    cropperOpen: true
                                });
                            }} />
                        </div>
                        <div className="nameSurnameDiv">
                            <h3>
                                {
                                    userInfo ? userInfo?.first_name + " " + userInfo?.last_name :
                                        userGoogle ? userGoogle?.first_name + " " + userGoogle?.last_name :
                                            userFb ? userFb?.first_name + " " + userFb?.last_name :
                                                ""
                                }
                            </h3>
                        </div>
                    </div>
                    <div>
                        <Link to="/editProfile">
                            <button className="edit_btn bi bi-pencil" onClick={() => {
                                console.log(userInfo);
                            }}>&nbsp; Edit profile</button>
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
                        <li>
                            <Link to="myCategories">My Categories</Link>
                        </li>
                    </ul>
                </div>
            </div>
            {picture.cropperOpen && (
                <div className="overlay" >
                    <Box display="block" className="image_crop">
                        <AvatarEditor
                            ref={setEditorRef}
                            image={picture.img}
                            width={200}
                            height={200}
                            border={50}
                            color={[255, 255, 255, 0.6]}
                            rotate={0}
                            borderRadius={100}
                            scale={picture.zoom}
                        />
                        <Slider
                            aria-label="raceSlider"
                            value={picture.zoom}
                            min={1}
                            max={10}
                            step={0.1}
                            onChange={handleSlider}
                        ></Slider>
                        <Box>
                            <Button variant="contained" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button onClick={handleSave}>Save</Button>
                        </Box>
                    </Box>
                </div>
            )}
            <Outlet />
        </>
    );
}
export default Profile;