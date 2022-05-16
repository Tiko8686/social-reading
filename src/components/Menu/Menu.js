import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Signin } from "../Signin/Signin";
import { Unauthorized } from "../Upload/Unauthorized";
import { Upload } from "../Upload/Upload";
import "./menu.css";

export function Menu() {
  const [menuBool, setMenuBool] = useState(false);
  const [user, setUser] = useState("");
  const [userGoogle, setUserGoogle] = useState("");
  const [userFb, setUserFb] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    setUserGoogle(JSON.parse(localStorage.getItem("userGoogle")));
    setUserFb(JSON.parse(localStorage.getItem("userFb")));
  }, []);
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <img
                src="https://social-reading-application.herokuapp.com/images/book.png"
                width="35px"
                className="book-icon"
                alt="book_icon"
              />
            </Link>
          </li>
        </ul>
        <ul className="menu-list">
          <li className="dropdown">
            <span className="category">Կատեգորիաներ</span>
            <ul className="dropdown-content">
              <li>
                <Link to="/category/professional">Մասնագիտական</Link>
              </li>
              <li>
                <Link to="/category/artistic">Գեղարվեստական</Link>
              </li>
              <li>
                <Link to="/category/historical">Պատմական</Link>
              </li>
              <li>
                <Link to="/category/motivational">Մոտիվացիոն</Link>
              </li>
              <li>
                <Link to="/category/psychological">Հոգեբանական</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/aboutus">Մեր մասին</Link>
          </li>
        </ul>
        <ul className="right-list">
          <li className="upload-btn">
            {user?<Upload />:<Unauthorized />}
            
          </li>
          <li className="search_input">
            <img
              src="https://social-reading-application.herokuapp.com/images/search.svg"
              alt="search_icon"
            />
            <input placeholder="Որոնել" className="search" />
          </li>
          <li className="login-btn">
            {user ? (
              <img
                src={user.avatar}
                onClick={() => navigate("/profile")}
                className="profile_pic_menu"
              />
            ) : userGoogle ? (
              <img
                src={userGoogle.avatar}
                onClick={() => navigate("/profile")}
                className="profile_pic_menu"
              />
            ) : userFb ? (
              <img
                src={userFb.avatar}
                onClick={() => navigate("/profile")}
                className="profile_pic_menu"
              />
            ) : (
              <Signin />
            )}
          </li>
          <li>
            <div className="menu" onClick={() => setMenuBool(!menuBool)}>
              {!menuBool && (
                <>
                  <span></span>
                  <span></span>
                  <span></span>
                </>
              )}
              {menuBool && <div className="closeMenu">x</div>}
            </div>
          </li>
        </ul>
      </nav>
      {menuBool && (
        <div className="resp_menu">
          <div className="responsive_menu">
            <ul className="resp_ul">
              <li className="dropdown_resp">
                <span className="resp_category">Կատեգորիաներ</span>
                <ul
                  className="category_submenu"
                  onClick={() => setMenuBool(false)}
                >
                  <li>
                    <Link to="/category/professional">Մասնագիտական</Link>
                  </li>
                  <li>
                    <Link to="/category/artistic">Գեղարվեստական</Link>
                  </li>
                  <li>
                    <Link to="/category/historical">Պատմական</Link>
                  </li>
                  <li>
                    <Link to="/category/motivational">Մոտիվացիոն</Link>
                  </li>
                  <li>
                    <Link to="/category/psychological">Հոգեբանական</Link>
                  </li>
                </ul>
              </li>
              <li onClick={() => setMenuBool(false)}>
                <Link to="/aboutus">Մեր մասին</Link>
              </li>
              <li>
                <Upload />
              </li>
              <li>
              {user ? (
              <img
                src={user.avatar}
                onClick={() => navigate("/profile")}
                className="profile_pic_menu"
              />
            ) : userGoogle ? (
              <img
                src={userGoogle.avatar}
                onClick={() => navigate("/profile")}
                className="profile_pic_menu"
              />
            ) : userFb ? (
              <img
                src={userFb.avatar}
                onClick={() => navigate("/profile")}
                className="profile_pic_menu"
              />
            ) : (
              <Signin />
            )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Menu;
