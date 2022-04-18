import { Link } from "react-router-dom";

function Menu() {
  return (
    <>
    <div>
        <h1> Kategorianer</h1>
      <nav>
        <Link to="/category/professional">Մասնագիտական</Link><br></br>
        <Link to="/category/artistic">Գեղարվեստական</Link><br></br>
        <Link to="/category/historical">Պատմական</Link><br></br>
        <Link to="/category/motivational">Մոտիվացիոն</Link><br></br>
      </nav>
      </div>
    </>
  );
}
export default Menu;
