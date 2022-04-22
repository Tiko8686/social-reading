import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "../Upload/Upload";
import "./menu.css";
export function Menu() {
  useEffect(() => {
    axios.post(`http://192.168.0.124:8000/categories/`,{name: "Barev"},
    )
        .then(response => {
            console.log(response.data)
        })
        .catch((error) => {
            if (error.response) {
                console.log("error.response ", error.response);
            } else if (error.request) {
                console.log("error.request ", error.request);
            } else if (error.message) {
                console.log("error.request ", error.message);
            }
        })
}, [])
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
        <li className="search_input" >
          <img src="http://localhost:3000/images/search.svg"/>
          <input placeholder="Որոնել" className="search" />
        </li>
        <li>
          <button className="signin bi-person" style={{color:"white"}}></button>
        </li>
      </ul>
    </nav>
  );
}
export default Menu;
