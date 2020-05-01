//React core components
import React, { Component } from "react";
//custom components
import NavList from "../NavList/NavList";
//css
import "./nav.css";
//links - this array can be imported as a constant, placed within the nav element to keep project structure flexible
const NAVITEMS = [
  {
    href: "heading-one",
    text: "Heading One",
    sublinks: [
      {
        href: "subheading-one",
        text: "Subheading One",
      },
      {
        href: "subheading-two",
        text: "Subheading Two",
      },
    ],
  },
  {
    href: "heading-two",
    text: "Heading Two",
  },
  {
    href: "heading-three",
    text: "Heading Three",
    sublinks: [
      {
        href: "subheading-three",
        text: "Subheading Three",
      },
      {
        href: "subheading-four",
        text: "Subheading Four",
      },
      {
        href: "subheading-five",
        text: "Subheading Five",
      },
    ],
  },
];
NAVITEMS.map((link) => {
  link.key = `nav-link-${link.href}-${link.text}`;
  return link;
});
//component
class Nav extends Component {
  render() {
    return (
      <nav role="navigation" aria-label="Primary" className="nav">
        <ul id="nav_inner" className="nav__list">
          {NAVITEMS.map((item, i) => {
            return (
              <NavList
                key={item.hasOwnProperty("key") ? item.key : `link-${i}`}
                text={item.text}
                href={item.href}
                sublinks={
                  item.hasOwnProperty("sublinks") && item.sublinks.length > 0
                    ? item.sublinks
                    : []
                }
              />
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default Nav;
