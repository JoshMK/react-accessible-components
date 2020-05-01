//React core components
import React, { Component } from "react";
//css
//import "./navlist.css";

class NavList extends Component {
  state = {
    focused: false,
    sublinks: this.props.sublinks,
    index: 0,
  };

  list = React.createRef();

  cycleListWithKeyboard = (e) => {
    console.log("test");
    if (e.keyCode === 40) {
      //
      this.setState(
        {
          focused: true,
        },
        () => {
          this.list.current.children[
            this.state.index
          ].firstElementChild.focus();
        },
        () => {
          console.log("ji");
          this.setState({
            index: this.state.index + 1,
          });
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
          ref={this.list}
          className={`nav__list__drop ${this.state.focused ? "has-focus" : ""}`}
        >
          {sublinks.map((sublink, i) => {
            return (
              <li
                key={
                  sublink.hasOwnProperty("key") ? sublink.key : `sublink-${i}`
                }
              >
                <a href={sublink.href}>{sublink.text}</a>
              </li>
            );
          })}
        </ul>
      </li>
    );
  }
}

export default NavList;
