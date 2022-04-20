import { Link } from "react-router-dom";
import { Modal } from "../components/Upload";
import "./menu.css"
function Menu() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" >Գլխավոր</Link>
        </li>
      </ul>
      <ul >
        <li className="dropdown">
          <span>Կատեգորիաներ</span>
          <ul className="dropdown-content">
            <li>
              <Link to="/category/professional">Մասնագիտական</Link>
            </li>
            <br></br>
            <li>
              <Link to="/category/artistic">Գեղարվեստական</Link>
            </li>
            <br></br>
            <li>
              <Link to="/category/historical">Պատմական</Link>
            </li>
            <br></br>
            <li>
              <Link to="/category/motivational">Մոտիվացիոն</Link>
            </li>
            <br></br>
            <li> <Link to="/category/psychological">Հոգեբանական</Link></li>
          </ul>
        </li>
        <li>
          <Link to="#" >Մեր մասին</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Modal />

        </li>
        <li>
          <input placeholder="Որոնել" />
        </li>
      </ul>
    </nav>
  )
}
export default Menu;
