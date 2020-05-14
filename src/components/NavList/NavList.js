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

  //true - right | false - left
  cycleParentListLeftRightWithKeyboard = (parentList, increment) => {
    const IncrementDecrement =
      increment === true ? parentList.nextSibling : parentList.previousSibling;
    if (IncrementDecrement !== null) {
      IncrementDecrement.firstElementChild.focus();
    }
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
    const parentList = this.list.current.parentNode;
    //left arrow key - cycle through topmost list items
    if (key === "ArrowLeft" || key === 37) {
      if (this.state.index === -1) {
        //only cycle left if sibling exists
        this.cycleParentListLeftRightWithKeyboard(parentList, false);
      }
    }
    //right arrow key - cycle through topmost list items
    else if (key === "ArrowRight" || key === 39) {
      if (this.state.index === -1) {
        //only cycle left if sibling exists
        this.cycleParentListLeftRightWithKeyboard(parentList, true);
      }
    }
    //down arrow key
    else if (key === "ArrowDown" || key === 40) {
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
      if (this.state.index === -1 && list.childElementCount > 0) {
        this.updateListIndex(true);
      }
    }
  };

  componentDidMount() {
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
        <a
          aria-controls={`menu-${this.props.id}`}
          href={this.props.href}
          id={this.props.id}
        >
          {this.props.text}
        </a>
        <ul
          ref={this.list}
          id={`menu-${this.props.id}`}
          className={`nav__list__drop ${this.state.focused ? "has-focus" : ""}`}
          aria-expanded={this.state.focused === true ? "true" : "false"}
          aria-labelledby={this.props.id}
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
