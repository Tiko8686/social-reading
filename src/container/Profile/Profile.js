import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./profile.css";
import { Button, Box, Slider } from "@material-ui/core";
import AvatarEditor from "react-avatar-editor";
import axios from "axios";
function Profile() {
    const [userInfo, setUserInfo] = useState("");
    const [token, setToken] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        const tokenn = JSON.parse(localStorage.getItem("token"));
        if (tokenn) {
            setToken("JWT " + tokenn.access)
        }

        if (!tokenn) {
            navigate("/");
        } else {
            if (JSON.parse(localStorage.getItem("user"))) {
                setUserInfo(JSON.parse(localStorage.getItem("user")));
                setPicture({ ...picture, croppedImg: JSON.parse(localStorage.getItem("user")).avatar })
                setPictureBack({ ...pictureBack, croppedImg: JSON.parse(localStorage.getItem("user")).profile_background })
            }
        }
    }, [navigate]);


    // base 64 to image
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
            const canvasScaled = editor.getImageScaledToCanvas();
            const croppedImg = canvasScaled.toDataURL();
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
            });
        }
    };

    // change background pic methods

    let editorBack = "";
    const [pictureBack, setPictureBack] = useState({
        cropperOpen: false,
        img: null,
        zoom: 2,
        croppedImg: ""
    });
    const handleSliderBack = (event, value) => {
        setPictureBack({
            ...pictureBack,
            zoom: value
        });
    };
    const handleCancelBack = () => {
        setPictureBack({
            ...pictureBack,
            cropperOpen: false

        });
    };
    const setEditorRefBack = (ed) => {
        editorBack = ed;
    };
    const handleSaveBack = (e) => {
        if (setEditorRefBack) {
            const canvasScaled = editorBack.getImageScaledToCanvas();
            const croppedImgBack = canvasScaled.toDataURL();
            let file = dataURLtoFile(croppedImgBack, 'profileBack.png');
            const formData = new FormData();
            formData.append("profile_background", file);

            axios.patch('https://socialreading.xyz/auth/users/me/', formData, {
                headers: { "Authorization": token }
            })
                .then(resp => {
                    console.log("respo", resp)
                    if (JSON.parse(localStorage.getItem("token"))) {
                        localStorage.setItem('user', JSON.stringify(resp.data));
                        setUserInfo(JSON.parse(localStorage.getItem("user")));
                        setPictureBack({ ...pictureBack, croppedImg: JSON.parse(localStorage.getItem("user")).profile_background, cropperOpen: false })
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
            setPictureBack({
                ...pictureBack,
                img: null,
                cropperOpen: false,
            });
        }
    };
    return (
        <>
            <div className="profilePage">
                <div className="profile_background"
                // style={{backgroundImage : "url("+pictureBack.croppedImg+ ")"}}
                >
                    {/* bacground photo */}
                    <img
                        width="100%"
                        height="350px"
                        // className="background_pic"
                        src={pictureBack.croppedImg}
                        alt="background_pic"
                    />
                    <label htmlFor="cover_photo" className="bi bi-camera edit_cover_photo_button">Change cover Photo</label>
                    <input type="file" id="cover_photo" onChange={(e) => {
                        let url = URL.createObjectURL(e.target.files[0]);
                        setPictureBack({
                            ...pictureBack,
                            img: url,
                            cropperOpen: true
                        });
                    }}
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
                                setPicture({
                                    ...picture,
                                    img: url,
                                    cropperOpen: true
                                });
                            }} />
                        </div>

                    </div>
                    <div className="nameSurnameDiv">
                        <h3>
                            {
                                userInfo ? userInfo?.first_name + " " + userInfo?.last_name
                                    : ""
                            }
                        </h3>
                    </div>
                </div>
                <div className="profile_menu">
                    <ul className="profile_menu_list">
                        <li>
                            <Link to="posts">Posts</Link>
                        </li>
                        <li>
                            <Link to="category">My categories</Link>
                        </li>
                        <li>
                            <Link to="saved">Saved</Link>
                        </li>
                    </ul>
                </div>
            </div>
            {picture.cropperOpen && (
                <>
                    <div className="overlay_avatar" >
                    </div>
                    <Box display="block" className="image_crop">
                        <AvatarEditor
                            ref={setEditorRef}
                            image={picture.img}
                            width={200}
                            height={100}
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
                            <Button variant="contained" onClick={handleCancel}>Cancel</Button>
                            <Button onClick={handleSave}>Save</Button>
                        </Box>
                    </Box></>

            )}
            {pictureBack.cropperOpen && (
                <>
                    <div className="overlay_cover" ></div>

                    <Box display="block" className="image_crop_back">
                        <AvatarEditor
                            ref={setEditorRefBack}
                            image={pictureBack.img}
                            width={700}
                            height={200}
                            border={50}
                            color={[255, 255, 255, 0.6]}
                            rotate={0}
                            scale={pictureBack.zoom}
                        />
                        <Slider
                            aria-label="raceSlider"
                            value={pictureBack.zoom}
                            min={1}
                            max={10}
                            step={0.1}
                            onChange={handleSliderBack}
                        ></Slider>
                        <Box>
                            <Button variant="contained" onClick={handleCancelBack}>Cancel</Button>
                            <Button onClick={handleSaveBack}>Save</Button>
                        </Box>
                    </Box></>

            )}
            <Outlet />
        </>
    );
}
export default Profile;