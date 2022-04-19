import { Link } from "react-router-dom";
import "./menu.css";
function Menu() {
  return (

    <>
      <div className="dropdown">
        <h2> Կատեգորիաներ</h2>
       
        <nav className="dropdown-content">
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
          
        </nav>

      </div>
      <button className="myBtn">UPLOAD</button> 
    </>

  );
}
export default Menu;
