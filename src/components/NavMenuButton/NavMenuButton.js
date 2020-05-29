//React core components
import React from "react";
//css
import "./nav-menu-button.css";
//component
const NavMenuButton = (props) => {
  return (
    <button
      className="app__menu-button"
      aria-expanded={props.mobileMenuToggled ? "true" : "false"}
      onClick={props.toggleMobileMenu}
    >
      <span className="app__menu-button-text">Menu</span>
      <span className="app__menu-button-line" aria-hidden="true"></span>
      <span className="app__menu-button-line" aria-hidden="true"></span>
      <span className="app__menu-button-line" aria-hidden="true"></span>
    </button>
  );
};

export default NavMenuButton;
