import { NavLink } from "react-router-dom";
import "./Navbar.css"

export const Navbar = () =>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">

    <NavLink className="navbar-brand" to="/inicio">
      <div id="logo">
        <svg width="35px" height="35px" stroke-width="1.7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M3 9v10a2 2 0 002 2h14a2 2 0 002-2V9" stroke="#000000" stroke-width="1.7"></path><path d="M20.485 3h-3.992l.5 5s1 1 2.5 1a3.23 3.23 0 002.139-.806.503.503 0 00.15-.465L21.076 3.5A.6.6 0 0020.485 3z" stroke="#000000" stroke-width="1.7"></path><path d="M16.493 3l.5 5s-1 1-2.5 1-2.5-1-2.5-1V3h4.5z" stroke="#000000" stroke-width="1.7"></path><path d="M11.993 3v5s-1 1-2.5 1-2.5-1-2.5-1l.5-5h4.5z" stroke="#000000" stroke-width="1.7"></path><path d="M7.493 3H3.502a.6.6 0 00-.592.501L2.205 7.73c-.029.172.02.349.15.465.328.29 1.061.806 2.138.806 1.5 0 2.5-1 2.5-1l.5-5z" stroke="#000000" stroke-width="1.7"></path></svg>

      </div>
    </NavLink>

    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse " id="navbarSupportedContent">
      <ul className="navbar-nav mx-auto ">

        <li className="nav-item">
          <NavLink className="nav-link" to="/inicio">Inicio <span className="sr-only">(current)</span></NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/alta">Alta </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/carrito">Carrito</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/contacto">Contacto</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/nosotros">Nosotros</NavLink>
        </li>

      </ul>

      <form className="form-inline my-2 my-lg-0 me-3">
        <input className="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Search" />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
      </form>

      <NavLink className="navbar-brand" to="/carrito">
        <div id="boton-carrito">
          <svg width="35px" height="35px" stroke-width="1.7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M19.5 22a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM9.5 22a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" fill="#000000" stroke="#000000" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 4h17l-2 11H7L5 4zm0 0c-.167-.667-1-2-3-2M20 15H5.23c-1.784 0-2.73.781-2.73 2 0 1.219.946 2 2.73 2H19.5" stroke="#000000" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </div>
      </NavLink>

    </div>

  </nav>