//React core components
import React, { useState } from "react";
//css
import "./navlist-tab.css";

const NavList = ({ mobileMenuToggled, isMobile, href, text, sublinks }) => {
  const [focused, setFocused] = useState(false);

  return (
    <li
      tabIndex="-1"
      className={`app__navlist${
        !mobileMenuToggled && isMobile ? " app__navlist--hidden" : ""
      }`}
    >
      <a href={href}>{text}</a>
      {sublinks.length > 0 && (
        <ul
          className={`app__navlist-dropdown${
            focused ? " app__navlist-dropdown--focused" : ""
          }`}
        >
          {sublinks.map((sublink, i) => {
            return (
              <li key={i}>
                <a
                  href={sublink.href}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                >
                  {sublink.text}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
};

export default NavList;
