import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "../Upload/Upload";
import "./menu.css";
export function Menu() {
  const [menuBool, setMenuBool] = useState(false);
  console.log(menuBool)
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <img src="http://localhost:3000/images/book.png" width="35px" className="book-icon" />
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
                {" "}
                <Link to="/category/psychological">Հոգեբանական</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="#">Մեր մասին</Link>
          </li>
        </ul>
        <ul className="right-list">
          <li className="upload-btn">
            <Modal />
          </li>
          <li className="search_input" >
            <img src="http://localhost:3000/images/search.svg" />
            <input placeholder="Որոնել" className="search" />
          </li>
          <li className="login-btn">
            <button className="signin bi-person" style={{ color: "white" }}></button>
          </li>
          <li>
            <div className="menu" onClick={() => setMenuBool(!menuBool)}>
              {!menuBool &&
                (<>
                  <span></span>
                  <span></span>
                  <span></span>
                </>
                )
              }
              {menuBool && (<div className="closeMenu">x</div>)}
            </div>
          </li>
        </ul>

      </nav>
      {menuBool && (<div className="responsive_menu">
        <ul>
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
            <Link to="#">Մեր մասին</Link>
          </li>
          <li>
            <Modal />
          </li>
        </ul>
      </div>)}

    </>

  );
}
export default Menu;
