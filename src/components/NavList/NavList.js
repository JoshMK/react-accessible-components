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

  resetListFocusAfterClick = (e) => {
    if (!this.list.current.contains(e.target)) {
      this.resetListFocus();
    }
  };

  resetListFocus = () => {
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

  //true - increment | false - decrement
  updateListIndex = (increment = true) => {
    this.setState(
      (prevState) => ({
        ...prevState,
        focused: true,
      }),
      () => {
        this.incrementDecrementListIndex(this.state.index, increment);
        this.list.current.children[
          increment === true ? this.state.index + 1 : this.state.index - 1
        ].firstElementChild.focus();
      }
    );
  };

  cycleListWithKeyboard = (e, list) => {
    const key = e.key || e.which || e.keyCode;
    //down arrow key
    if (key === "ArrowDown" || key === 40) {
      if (
        list.childElementCount > 0 &&
        this.state.index + 1 < list.childElementCount
      ) {
        this.updateListIndex(true);
      }
      //up arrow key
    } else if (key === "ArrowUp" || key === 40) {
      if (this.state.index > 0) {
        this.updateListIndex(false);
      }
      //tab - reset index after tabbing or shift-tabbing through nav
    } else if (key === "Tab" || key === 9) {
      this.resetListFocus();
    }
    //enter - focus initial child
    else if (key === "Enter" || key === 13) {
      if (this.state.index === -1) {
        this.updateListIndex(true);
      }
    }
  };

  componentWillMount() {
    document.addEventListener("click", this.resetListFocusAfterClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.resetListFocusAfterClick, false);
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
