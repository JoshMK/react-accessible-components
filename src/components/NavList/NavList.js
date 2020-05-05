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

  cycleListWithKeyboard = (e) => {
    console.log(e.keyCode);
    const list = this.list.current;
    //down arrow key
    if (e.keyCode === 40) {
      //
      this.setState(
        (prevState) => ({
          ...prevState,
          focused: true,
        }),
        () => {
          list.children[this.state.index].firstElementChild.focus();
          this.incrementDecrementListIndex(this.state.index, true);
        }
      );
      //up arrow key
    } else if (e.keyCode === 38) {
      if (this.state.index > 0) {
        this.setState(
          (prevState) => ({
            ...prevState,
            focused: true,
          }),
          () => {
            list.children[this.state.index - 1].firstElementChild.focus();
            this.incrementDecrementListIndex(this.state.index - 1, false);
          }
        );
      }
    } else if (e.keyCode === 9) {
      this.setState({
        focused: false,
      });
    }
  };

  list = React.createRef();

  render() {
    const sublinks = this.props.sublinks;
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
