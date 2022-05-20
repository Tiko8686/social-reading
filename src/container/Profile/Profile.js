import { useEffect, useState, useRef } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./profile.css";
import { Button, Box, Slider } from "@material-ui/core";
import AvatarEditor from "react-avatar-editor";

function Profile() {
  const [userInfo, setUserInfo] = useState("");
  const [userGoogle, setUserGoogle] = useState("");
  const [userFb, setUserFb] = useState("");
  const navigate = useNavigate();
  let editor = "";

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const tokenGoogle = JSON.parse(localStorage.getItem("tokenGoogle"));
    const tokenFb = JSON.parse(localStorage.getItem("tokenFb"));

    if (!token && !tokenGoogle && !tokenFb) {
      navigate("/");
    } else {
      if (JSON.parse(localStorage.getItem("user"))) {
        setUserInfo(JSON.parse(localStorage.getItem("user")));
        setPicture({
          ...picture,
          croppedImg: JSON.parse(localStorage.getItem("user")).avatar,
        });
      } else if (JSON.parse(localStorage.getItem("userGoogle"))) {
        setUserGoogle(JSON.parse(localStorage.getItem("userGoogle")));
        setPicture({
          ...picture,
          croppedImg: JSON.parse(localStorage.getItem("userGoogle"))
            .avatar_google,
        });
      } else if (JSON.parse(localStorage.getItem("userFb"))) {
        setUserFb(JSON.parse(localStorage.getItem("userFb")));
        setPicture({
          ...picture,
          croppedImg: JSON.parse(localStorage.getItem("userFb"))
            .avatar_facebook,
        });
      }
    }
  }, []);
  const [picture, setPicture] = useState({
    cropperOpen: false,
    img: null,
    zoom: 2,
    croppedImg: "",
  });

  const [modal, setModal] = useState(false);

  const handleSlider = (event, value) => {
    setPicture({
      ...picture,
      zoom: value,
    });
  };

  const handleCancel = () => {
    setPicture({
      ...picture,
      cropperOpen: false,
    });
  };

  const setEditorRef = (ed) => {
    editor = ed;
  };

  const handleSave = (e) => {
    if (setEditorRef) {
      const canvasScaled = editor.getImageScaledToCanvas();
      const croppedImg = canvasScaled.toDataURL();
      console.log("croppedImg", croppedImg);
      setPicture({
        ...picture,
        img: null,
        cropperOpen: false,
        croppedImg: croppedImg,
      });
    }
  };
  return (
    <>
      <div className="profilePage">
        <div className="profile_background">
          {userInfo?.profile_background ? (
            <img
              className="background_pic"
              src={userInfo.profile_background}
              alt="background_pic"
            />
          ) : userGoogle?.profile_background ? (
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
          ) : (
            ""
          )}
          <label
            htmlFor="cover_photo"
            className="bi bi-camera edit_cover_photo_button"
          >
            Add cover Photo
          </label>
          <input type="file" id="cover_photo" onChange={(e) => {}} />
        </div>
        <div className="my_info">
          <div className="name_and_pic">
            <div className="pic_div">
              <img
                className="autor_pic"
                src={picture.croppedImg}
                alt="profile_pic"
              />
              <label
                htmlFor="profile_photo"
                className="bi bi-camera edit_profile_pic"
              ></label>
              <input
                type="file"
                id="profile_photo"
                onChange={(e) => {
                  let url = URL.createObjectURL(e.target.files[0]);
                  console.log(url);
                  setPicture({
                    ...picture,
                    img: url,
                    cropperOpen: true,
                  });
                }}
              />
            </div>
            <div className="nameSurnameDiv">
              <h3>
                {userInfo
                  ? userInfo?.first_name + " " + userInfo?.last_name
                  : userGoogle
                  ? userGoogle?.first_name + " " + userGoogle?.last_name
                  : userFb
                  ? userFb?.first_name + " " + userFb?.last_name
                  : ""}
              </h3>
            </div>
          </div>
          <div>
            <Link to="/editProfile">
              <button
                className="edit_btn bi bi-pencil"
                onClick={() => {
                  console.log(userInfo);
                }}
              >
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

      {picture.cropperOpen && (
        <div className="overlay">
          <Box display="block" className="image_crop">
            <AvatarEditor
              ref={setEditorRef}
              image={picture.img}
              width={200}
              height={200}
              border={50}
              color={[255, 255, 255, 0.6]}
              rotate={0}
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
