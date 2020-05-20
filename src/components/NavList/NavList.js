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

  //originally set on every link/list using aria-expanded={this.state.focused === true ? "true" : "false"}
  toggleAriaExpanded = (expand) => {
    const list = this.list.current;
    if (list.getAttribute("aria-expanded") !== null) {
      list.setAttribute("aria-expanded", expand);
      list.previousSibling.setAttribute("aria-expanded", expand);
    }
  };

  //detect if a list has been deselected via mouse click
  resetListFocusAfterClick = (e) => {
    const list = this.list.current;
    if (list !== null && !list.contains(e.target)) {
      this.resetListFocus();
    }
  };

  //return a list to its default index/focus/aria-expanded state
  resetListFocus = () => {
    this.setState(
      (prevState) => ({
        ...prevState,
        focused: false,
        index: -1,
      }),
      this.toggleAriaExpanded("false")
    );
  };

  //true - right | false - left
  cycleParentListLeftRightWithKeyboard = (parentList, increment) => {
    const IncrementDecrement =
      increment === true ? parentList.nextSibling : parentList.previousSibling;
    if (IncrementDecrement !== null) {
      IncrementDecrement.firstElementChild.focus();
    }
  };

  //true - increment | false - decrement
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
        //toggle aria-expanded on first list item index
        if (increment === true && this.state.index === -1) {
          this.toggleAriaExpanded("true");
        }
        this.incrementDecrementListIndex(this.state.index, increment);
        this.list.current.children[
          increment === true ? this.state.index + 1 : this.state.index - 1
        ].firstElementChild.focus();
      }
    );
  };

  cycleListWithKeyboard = (e) => {
    if (this.list.current !== null) {
      const key = e.key || e.which || e.keyCode;
      const list = this.list.current;
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
      else if (key === "Enter" || key === 32) {
        if (this.state.index === -1 && list.childElementCount > 0) {
          this.updateListIndex(true);
        }
      }
      //space - simulate click in topmost dropdown nav link
      else if (key === " " || key === 32) {
        if (this.state.index === -1) {
          list.previousSibling.click();
        }
        //otherwise, click current dropdown link
        else {
          list.children[this.state.index].firstElementChild.click();
        }
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
        className={`navlist-dropdown ${
          this.state.focused ? "navlist-dropdown--focused" : ""
        }`}
        tabIndex="-1"
        onKeyDown={(e) => this.cycleListWithKeyboard(e)}
        onMouseEnter={() => this.toggleAriaExpanded("true")}
        onMouseLeave={() => this.toggleAriaExpanded("false")}
      >
        <a
          id={this.props.id}
          href={this.props.href}
          {...this.props.sublinkAriaAttributes}
        >
          {this.props.text}
        </a>
        <ul
          ref={this.list}
          id={`menu-${this.props.id}`}
          className={`dropdown-menu ${this.state.focused ? "has-focus" : ""}`}
          {...this.props.sublinkListAriaAttributes}
        >
          {sublinks.map((sublink, i) => {
            return (
              <li key={sublink.key} tabIndex="-1">
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
