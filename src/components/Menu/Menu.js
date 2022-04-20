import { Link } from "react-router-dom";
import { Modal } from "../Upload/Upload";
import "./menu.css";
function Menu() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <img src="http://localhost:3000/images/book.png" width="35px" />
          </Link>
        </li>
      </ul>
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
              {" "}
              <Link to="/category/psychological">Հոգեբանական</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="#">Մեր մասին</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Modal />
        </li>
        <li>
          <input placeholder="Որոնել" className="search" />
        </li>
        <li>
          <button className="signin bi-person"></button>
        </li>
      </ul>
    </nav>
  );
}
export default Menu;
