import { Link } from "react-router-dom";
import "./menu.css";
function Menu() {
  return (
    <header class="section-header">
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
          <div class="collapse navbar-collapse" id="main_nav">
            <ul class="navbar-nav">
              <li class="nav-item dropdown">
                <span
                  class="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  Կատեգորիա
                </span>
                <ul class="dropdown-menu fade-up">
                  <li>
                    <Link class="dropdown-item" to="/category/professional">
                      Մասնագիտական
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/category/artistic">
                      Գեղարվեստական
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/category/historical">
                      Պատմական
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/category/motivational">
                      Մոտիվացիոն
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Menu;
