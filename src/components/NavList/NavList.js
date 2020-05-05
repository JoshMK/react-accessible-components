//React core components
import React, { Component } from "react";
//css
import "./navlist.css";

class NavList extends Component {
  state = {
    focused: false,
    sublinks: this.props.sublinks,
    index: 0,
  };

  resetFocus = (e) => {
    e.preventDefault();
    console.log(e);
  };

  cycleListWithKeyboard = (e) => {
    console.log("test");
    if (e.keyCode === 40) {
      //
      this.setState(
        (prevState) => ({
          ...prevState,
          focused: true,
        }),
        () => {
          this.list.current.children[
            this.state.index
          ].firstElementChild.focus();
        },
        () => {
          console.log("ji");
          this.setState((prevState) => ({
            ...prevState,
            index: prevState.index + 1,
          }));
        }
      );
    } else if (e.keyCode === 9) {
      this.setState({
        focused: false,
      });
    }
  };

  list = React.createRef();

  render() {
    const sublinks = this.state.sublinks;
    return (
      <li
        className={`has-drop ${this.state.focused ? "has-drop--focused" : ""}`}
        onKeyDown={(e) => this.cycleListWithKeyboard(e)}
        onMouseDown={(e) => this.resetFocus(e)}
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
