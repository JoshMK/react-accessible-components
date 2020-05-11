//React core components
import React, { Component } from "react";
//css
import "./navlist.css";

class NavList extends Component {
  state = {
    focused: false,
    index: -1,
  };

  list = React.createRef();

  resetFocusAfterClick = (e) => {
    if (!this.list.current.contains(e.target)) {
      this.resetFocus();
    }
  };

  resetFocus = () => {
    this.setState((prevState) => ({
      ...prevState,
      focused: false,
      index: -1,
    }));
  };

  incrementDecrementListIndex = (index, increment) => {
    this.setState((prevState) => ({
      ...prevState,
      index: increment === true ? prevState.index + 1 : prevState.index - 1,
    }));
  };

  cycleListWithKeyboard = (e, list) => {
    //console.log(e.keyCode);
    const key = e.key || e.which || e.keyCode;
    //down arrow key
    if (key === "ArrowDown" || key === 40) {
      //
      if (
        list.childElementCount > 0 &&
        this.state.index + 1 < list.childElementCount
      ) {
        //
        this.setState(
          (prevState) => ({
            ...prevState,
            focused: true,
          }),
          () => {
            this.incrementDecrementListIndex(this.state.index, true);
            list.children[this.state.index + 1].firstElementChild.focus();
          }
        );
      }
      //up arrow key
    } else if (key === "ArrowUp" || key === 40) {
      if (this.state.index > 0) {
        this.setState(
          (prevState) => ({
            ...prevState,
            focused: true,
          }),
          () => {
            this.incrementDecrementListIndex(this.state.index, false);
            list.children[this.state.index - 1].firstElementChild.focus();
          }
        );
      }
      //reset index after tabbing or shift-tabbing through nav
    } else if (key === "Tab" || key === 9) {
      this.resetFocus();
    }
    //enter - focus initial child
    else if (key === "Enter" || key === 13) {
      if (this.state.index === -1) {
        this.setState(
          (prevState) => ({
            ...prevState,
            focused: true,
          }),
          () => {
            this.incrementDecrementListIndex(this.state.index, true);
            list.children[this.state.index + 1].firstElementChild.focus();
          }
        );
      }
    }
  };

  componentWillMount() {
    document.addEventListener("click", this.resetFocusAfterClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.resetFocusAfterClick, false);
  }

  render() {
    const sublinks = this.props.sublinks;
    return (
      <li
        className={`has-drop ${this.state.focused ? "has-drop--focused" : ""}`}
        onKeyDown={(e) => this.cycleListWithKeyboard(e, this.list.current)}
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
