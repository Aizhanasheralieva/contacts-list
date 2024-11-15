import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container">
          <NavLink to="/" className="text-decoration-none">
            <span className="navbar-brand mb-0 text-white fs-1">Contacts</span>
          </NavLink>
          <div className="ms-auto">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/addNewContact">
                  <button
                    className="btn btn-outline-light text-black text-bold fs-4"
                    type="submit"
                  >
                    Add new contact
                  </button>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
