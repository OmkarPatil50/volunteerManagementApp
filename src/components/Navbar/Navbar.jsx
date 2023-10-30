import { NavLink } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <div className="navbar">
      <section>
        <h2 className="app-heading">Eventeer</h2>
      </section>
      <section>
        <nav>
          <NavLink to="/" activeclassname="active" className="nav-item link">
            Dashboard
          </NavLink>
          <NavLink
            to="/events"
            activeclassname="active"
            className="nav-item link"
          >
            Events
          </NavLink>
          <NavLink
            to="/volunteers"
            activeclassname="active"
            className="nav-item link"
          >
            Volunteers
          </NavLink>
          <NavLink
            to="/report"
            activeclassname="active"
            className="nav-item link"
          >
            Report
          </NavLink>
        </nav>
      </section>
    </div>
  );
};
