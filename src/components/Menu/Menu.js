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
  const [bool, setBool] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    setUserGoogle(JSON.parse(localStorage.getItem("userGoogle")));
    setUserFb(JSON.parse(localStorage.getItem("userFb")));
  }, [navigate]);

  return (
    <>
      <nav onClick={() => {
        if (bool) {
          setBool(false)
        }
      }}>
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
            <span className="category">Categories</span>
            <div className="dropdown-content">
              <Link to="/category/professional">Professional</Link>
              <Link to="/category/artistic">Artistic</Link>
              <Link to="/category/historical">Historical</Link>
              <Link to="/category/motivational">Motivational</Link>
              <Link to="/category/psychological">Psychological</Link>
            </div>
          </li>
          <li>
            <Link to="/aboutus">About Us</Link>
          </li>
        </ul>
        <ul className="right-list">
          <li className="upload-btn">{user || userGoogle || userFb ? <Upload /> : <Unauthorized />}</li>
          <li className="search_input">
            <img
              src="https://social-reading-application.herokuapp.com/images/search.svg"
              alt="search_icon"
            />
            <input placeholder="Search" className="search" />
          </li>
          <li className="login-btn">
            {
              user ? (
                <div className="login_user_menu">
                  <img
                    alt="profile_pic"
                    src={user.avatar}
                    onClick={() => navigate("/profile")}
                    className="profile_pic_menu"
                  />
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg"
                      width="16" height="16" fill="currentColor" className="bi bi-bell-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                    </svg>
                  </button>
                  <button onClick={() => setBool(!bool)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                  </button>
                  {
                    bool && (
                      <>
                        <div onClick={() => setBool(false)} className="over"></div>
                        <div
                          className="modal_menu_for_login"
                          onClick={() => setBool(false)}
                        >
                          <Link to="/settings" className="bi bi-gear settings">&nbsp;Settings</Link>
                          <Link to="/privacePolicy" className="privace_poilcy_txt">
                            <svg width="19" height="19" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9 6C8.60218 6 8.22065 6.15804 7.93934 6.43934C7.65804 6.72064 7.5 7.10218 7.5 7.5C7.50158 7.76177 7.57164 8.01857 7.70322 8.24488C7.83479 8.47118 8.0233 8.65912 8.25 8.79V11.25C8.25 11.4489 8.32902 11.6397 8.46967 11.7803C8.61033 11.921 8.80109 12 9 12C9.19892 12 9.38968 11.921 9.53033 11.7803C9.67099 11.6397 9.75 11.4489 9.75 11.25V8.79C9.97671 8.65912 10.1652 8.47118 10.2968 8.24488C10.4284 8.01857 10.4984 7.76177 10.5 7.5C10.5 7.10218 10.342 6.72064 10.0607 6.43934C9.77936 6.15804 9.39783 6 9 6ZM9 1.5C7.51664 1.5 6.0666 1.93987 4.83323 2.76398C3.59986 3.58809 2.63856 4.75943 2.07091 6.12987C1.50325 7.50032 1.35472 9.00832 1.64411 10.4632C1.9335 11.918 2.64781 13.2544 3.6967 14.3033C4.7456 15.3522 6.08197 16.0665 7.53683 16.3559C8.99168 16.6453 10.4997 16.4968 11.8701 15.9291C13.2406 15.3614 14.4119 14.4001 15.236 13.1668C16.0601 11.9334 16.5 10.4834 16.5 9C16.5 8.01509 16.306 7.03982 15.9291 6.12987C15.5522 5.21993 14.9997 4.39314 14.3033 3.6967C13.6069 3.00026 12.7801 2.44781 11.8701 2.0709C10.9602 1.69399 9.98492 1.5 9 1.5ZM9 15C7.81332 15 6.65328 14.6481 5.66658 13.9888C4.67989 13.3295 3.91085 12.3925 3.45673 11.2961C3.0026 10.1997 2.88378 8.99334 3.11529 7.82946C3.3468 6.66557 3.91825 5.59647 4.75736 4.75736C5.59648 3.91824 6.66558 3.3468 7.82946 3.11529C8.99335 2.88378 10.1997 3.0026 11.2961 3.45672C12.3925 3.91085 13.3295 4.67988 13.9888 5.66658C14.6481 6.65327 15 7.81331 15 9C15 10.5913 14.3679 12.1174 13.2426 13.2426C12.1174 14.3679 10.5913 15 9 15Z" fill="black" />
                            </svg>&nbsp;Privace Policy</Link>
                          <button className="log_out"
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
                          >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9.4425 9.75008L7.7175 11.4676C7.6472 11.5373 7.59141 11.6202 7.55333 11.7116C7.51525 11.803 7.49565 11.9011 7.49565 12.0001C7.49565 12.0991 7.51525 12.1971 7.55333 12.2885C7.59141 12.3799 7.6472 12.4629 7.7175 12.5326C7.78722 12.6029 7.87017 12.6587 7.96157 12.6967C8.05296 12.7348 8.15099 12.7544 8.25 12.7544C8.34901 12.7544 8.44704 12.7348 8.53843 12.6967C8.62983 12.6587 8.71278 12.6029 8.7825 12.5326L11.7825 9.53258C11.8508 9.46125 11.9043 9.37714 11.94 9.28508C12.015 9.10248 12.015 8.89767 11.94 8.71508C11.9043 8.62301 11.8508 8.5389 11.7825 8.46758L8.7825 5.46757C8.71257 5.39765 8.62955 5.34218 8.53819 5.30433C8.44682 5.26648 8.34889 5.24701 8.25 5.24701C8.15111 5.24701 8.05318 5.26648 7.96181 5.30433C7.87045 5.34218 7.78743 5.39765 7.7175 5.46757C7.64757 5.5375 7.5921 5.62052 7.55426 5.71189C7.51641 5.80325 7.49693 5.90118 7.49693 6.00007C7.49693 6.09897 7.51641 6.1969 7.55426 6.28826C7.5921 6.37963 7.64757 6.46265 7.7175 6.53257L9.4425 8.25008H2.25C2.05109 8.25008 1.86032 8.32909 1.71967 8.46975C1.57902 8.6104 1.5 8.80116 1.5 9.00008C1.5 9.19899 1.57902 9.38975 1.71967 9.53041C1.86032 9.67106 2.05109 9.75008 2.25 9.75008H9.4425ZM9 1.50007C7.59832 1.49382 6.22293 1.88048 5.02985 2.61622C3.83677 3.35195 2.87374 4.40731 2.25 5.66257C2.16049 5.8416 2.14576 6.04884 2.20905 6.23872C2.27235 6.4286 2.40848 6.58556 2.5875 6.67507C2.76652 6.76459 2.97377 6.77931 3.16365 6.71602C3.35353 6.65273 3.51049 6.5166 3.6 6.33757C4.07414 5.38007 4.79537 4.56654 5.68916 3.98107C6.58295 3.39559 7.61687 3.05941 8.68407 3.00727C9.75127 2.95512 10.813 3.18891 11.7596 3.68446C12.7062 4.18001 13.5034 4.91935 14.0686 5.82607C14.6338 6.7328 14.9467 7.77401 14.9748 8.84211C15.0029 9.91022 14.7453 10.9665 14.2286 11.9017C13.7119 12.8369 12.9549 13.6172 12.0357 14.1619C11.1164 14.7066 10.0685 14.996 9 15.0001C7.88166 15.0049 6.78462 14.6943 5.83477 14.104C4.88492 13.5137 4.12077 12.6675 3.63 11.6626C3.54049 11.4836 3.38353 11.3474 3.19365 11.2841C3.00377 11.2208 2.79652 11.2356 2.6175 11.3251C2.43848 11.4146 2.30235 11.5715 2.23905 11.7614C2.17576 11.9513 2.19049 12.1586 2.28 12.3376C2.87462 13.5342 3.77814 14.5503 4.8971 15.2806C6.01607 16.011 7.30984 16.4291 8.64459 16.4918C9.97935 16.5545 11.3066 16.2595 12.4891 15.6372C13.6716 15.0149 14.6664 14.0881 15.3706 12.9524C16.0747 11.8168 16.4627 10.5137 16.4944 9.17783C16.526 7.84198 16.2002 6.52192 15.5507 5.3542C14.9011 4.18648 13.9514 3.2135 12.7997 2.5359C11.648 1.85831 10.3362 1.5007 9 1.50007Z" fill="black" />
                            </svg>
                            &nbsp;Log Out</button>
                        </div>
                      </>
                    )
                  }
                </div>) : <Signin />
            }
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
      {/* responsive menu */}
      {menuBool && (
        <div className="resp_menu">
          <div className="responsive_menu">
            <ul className="resp_ul">
              <li className="dropdown_resp">
                <span className="resp_category">Categories</span>
                <ul
                  className="category_submenu"
                  onClick={() => setMenuBool(false)}
                >
                  <li>
                    <Link to="/category/professional">Professional</Link>
                  </li>
                  <li>
                    <Link to="/category/artistic">Artistic</Link>
                  </li>
                  <li>
                    <Link to="/category/historical">Historical</Link>
                  </li>
                  <li>
                    <Link to="/category/motivational">Motivational</Link>
                  </li>
                  <li>
                    <Link to="/category/psychological">Psychological</Link>
                  </li>
                </ul>
              </li>
              <li onClick={() => setMenuBool(false)}>
                <Link to="/aboutus">About us</Link>
              </li>
              <li>{user ? <Upload /> : <Unauthorized />} </li>
              <li >
                {user ? (
                  <img
                    alt="profile_pic"
                    src={user.avatar}
                    onClick={() => { setMenuBool(false); navigate("/profile") }}
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
