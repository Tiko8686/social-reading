import { Link } from "react-router-dom";
import "./menu.css"
function Menu() {
  return (
    <>
      <div>
        <h1> Կատեգորիաներ</h1>
        <nav>
          <li>
            <Link to="/category/professional">Մասնագիտական</Link>
          </li>{" "}
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
            {" "}
            <Link to="/category/motivational">Մոտիվացիոն</Link>
          </li>
          <br></br>
        </nav>
      </div>
    </>
  );
}
export default Menu;
