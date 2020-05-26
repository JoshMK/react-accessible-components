//React core components
import React, { Component } from "react";
//custom components
import NavListKeyboard from "../NavListKeyboard/NavListKeyboard";
//css
import "./nav.css";
//links - this array can be imported as a constant, placed within the nav element to keep project structure flexible
const NAVITEMS = [
  {
    id: "first", //use descriptive name based on content - (i.e., about, faq, etc.)
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
    id: "second",
    href: "heading-two",
    text: "Heading Two",
  },
  {
    id: "third",
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
  //set aria attributes for dropdown menus if they exist
  if (link.hasOwnProperty("sublinks")) {
    link.sublinkAriaAttributes = {
      "aria-controls": `menu-${link.id}`,
      "aria-haspopup": true,
      "aria-expanded": false, //need to set this as an obj prop to account for mixed dropdown / single link nav items
    };
    link.sublinkListAriaAttributes = {
      "aria-expanded": false,
      "aria-labelledby": link.id,
    };
  }
  return link;
});
//component
class Nav extends Component {
  render() {
    return (
      <nav aria-label="Primary">
        <ul className="app__nav">
          {NAVITEMS.map((item, i) => {
            return (
              <NavListKeyboard
                {...item}
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
