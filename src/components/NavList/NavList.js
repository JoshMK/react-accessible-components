//React core components
import React, { Component } from "react";
//css
import "./navlist.css";

class NavList extends Component {
  state = {
    focused: false,
  };

  render() {
    const sublinks = this.props.sublinks;
    return (
      <li className="has-drop">
        <a href={this.props.href}>{this.props.text}</a>
        <ul
          className={`nav__list__drop ${this.state.focused ? "has-focus" : ""}`}
        >
          {sublinks.map((sublink, i) => {
            return (
              <li
                key={
                  sublink.hasOwnProperty("key") ? sublink.key : `sublink-${i}`
                }
              >
                <a
                  href={sublink.href}
                  onFocus={() =>
                    this.setState({
                      focused: true,
                    })
                  }
                  onBlur={() =>
                    this.setState({
                      focused: false,
                    })
                  }
                >
                  {sublink.text}
                </a>
              </li>
            );
          })}
        </ul>
      </li>
    );
  }
}

export default NavList;
