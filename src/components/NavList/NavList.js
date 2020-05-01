//React core components
import React, { Component } from "react";
//css
//import "./navlist.css";

class NavList extends Component {
  state = {
    focused: false,
    sublinks: this.props.sublinks,
  };

  listSublink = React.createRef();

  cycleListWithKeyboard = (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 40) {
      this.setState(
        {
          focused: true,
        },
        () => {
          this.listSublink.current.focus();
        }
      );
    } else if (e.keyCode === 9) {
      this.setState({
        focused: false,
      });
    }
  };

  render() {
    const sublinks = this.state.sublinks;
    return (
      <li
        className={`has-drop ${this.state.focused ? "has-drop--focused" : ""}`}
        onKeyDown={(e) => this.cycleListWithKeyboard(e)}
      >
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
                <a href={sublink.href} ref={this.listSublink}>
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
