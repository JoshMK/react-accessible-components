//React core components
import React, { Component } from "react";
//css
import "./navlist.css";

class NavList extends Component {
  state = {
    focused: false,
    index: 0,
  };

  resetFocus = (e) => {
    e.preventDefault();
    console.log(e);
  };

  incrementDecrementListIndex = (index, increment) => {
    this.setState((prevState) => ({
      ...prevState,
      index: increment === true ? prevState.index + 1 : prevState.index - 1,
    }));
  };

  cycleListWithKeyboard = (e, list) => {
    console.log(e.keyCode);
    console.log(this.state.index);
    //down arrow key
    if (e.keyCode === 40) {
      //
      if (
        list.childElementCount > 0 &&
        this.state.index < list.childElementCount
      ) {
        //
        this.setState(
          (prevState) => ({
            ...prevState,
            focused: true,
          }),
          () => {
            this.incrementDecrementListIndex(this.state.index, true);
            list.children[this.state.index].firstElementChild.focus();
          }
        );
      }

      //up arrow key
    } else if (e.keyCode === 38) {
      if (this.state.index > 0) {
        this.setState(
          (prevState) => ({
            ...prevState,
            focused: true,
          }),
          () => {
            this.incrementDecrementListIndex(this.state.index, false);
            list.children[this.state.index - 2].firstElementChild.focus();
          }
        );
      }
    } else if (e.keyCode === 9) {
      this.setState((prevState) => ({
        ...prevState,
        focused: false,
        index: 0,
      }));
    }
  };

  list = React.createRef();

  render() {
    const sublinks = this.props.sublinks;
    return (
      <li
        className={`has-drop ${this.state.focused ? "has-drop--focused" : ""}`}
        onKeyDown={(e) => this.cycleListWithKeyboard(e, this.list.current)}
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
