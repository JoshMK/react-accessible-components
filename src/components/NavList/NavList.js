//React core components
import React, { Component } from "react";
//css
import "./navlist.css";

class NavList extends Component {
  state = {
    focused: false,
  };

  render() {
    return (
      <li className="has-drop">
        <a href={this.props.href}>{this.props.text}</a>
        <ul
          className={`nav__list__drop ${this.state.focused ? "has-focus" : ""}`}
        >
          {this.props.sublinks.map((sublink) => {
            return (
              <li>
                <a
                  href="#item1"
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
