import { Link } from "react-router-dom";
import "./menu.css"
function Menu() {
  return (
    <nav>

      <ul>
        <li>
          <Link to="/">Գլխավոր</Link>
        </li>
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
            <li> <Link to="/category/hogebanakan">Հոգեբանական</Link></li>
          </ul>

        </li>

      </ul>
      <button className="myBtn">UPLOAD</button>
    </nav>
  )
}
export default Menu;
