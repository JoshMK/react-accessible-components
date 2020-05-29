//React core components
import React, { Component } from "react";
//css
import "./navlist-tab.css";

class NavList extends Component {
  state = {
    focused: false,
  };

  render() {
    return (
      <li tabIndex="-1" className="has-drop">
        <a href={this.props.href}>{this.props.text}</a>
        <ul
          className={`nav__list__drop ${this.state.focused ? "has-focus" : ""}`}
        >
          {this.props.sublinks.map((sublink, i) => {
            return (
              <li key={i}>
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
