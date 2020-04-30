//React core components
import React, { Component } from "react";
//custom components
import NavList from "../NavList/NavList";
//css
import "./nav.css";
//links - this array can be imported as a constant, placed within the nav element to keep project structure flexible
const NAVITEMS = [
  {
    href: "heading1",
    text: "Heading 1",
    sublinks: [
      {
        href: "subheading1",
        text: "Subheading 1",
      },
      {
        href: "subheading2",
        text: "Subheading 2",
      },
    ],
  },
  {
    href: "heading2",
    text: "Heading 2",
  },
  {
    href: "heading3",
    text: "Heading 3",
    sublinks: [
      {
        href: "subheading1",
        text: "Subheading 1",
      },
      {
        href: "subheading2",
        text: "Subheading 2",
      },
      {
        href: "subheading3",
        text: "Subheading 3",
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
