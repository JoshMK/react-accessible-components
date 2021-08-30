//React core components
import React, { useState, useEffect } from "react";
//custom components
import NavMenuButton from "../NavMenuButton/NavMenuButton";
//import NavListKeyboard from "../NavListKeyboard/NavListKeyboard";
import NavListTab from "../NavListTab/NavListTab";
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
const Nav = () => {
  const [mobileMenuToggled, setMobileMenuToggled] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const checkIsMobile = () => {
    window.innerWidth > 768 ? setIsMobile(false) : setIsMobile(true);
  };

  const toggleMobileMenu = () => {
    setMobileMenuToggled(!mobileMenuToggled);
  };

  useEffect(() => {
    window.addEventListener("resize", checkIsMobile);
    checkIsMobile();
  }, []);

  return (
    <nav aria-label="Primary">
      <NavMenuButton
        mobileMenuToggled={mobileMenuToggled}
        toggleMobileMenu={toggleMobileMenu}
      />
      <ul className="app__nav">
        {NAVITEMS.map((item) => {
          return (
            <>
              <NavListTab
                {...item}
                isMobile={isMobile}
                mobileMenuToggled={mobileMenuToggled}
                sublinks={
                  item.hasOwnProperty("sublinks") && item.sublinks.length > 0
                    ? item.sublinks
                    : []
                }
              />
            </>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
