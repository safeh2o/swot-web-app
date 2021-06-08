import React, { Component } from "react";

class Notice extends Component {
  render() {
    return (
      <span className="txt-icon notice">
        <i>
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 40 40">
            <circle fill="#929EAC" cx="20" cy="20" r="20" />
            <line fill="none" stroke="#FCFCFC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" x1="20" y1="10" x2="20" y2="21.1" />
            <circle fill="#F6F7F7" cx="20" cy="29.2" r="2.5" />
          </svg>
        </i>
        <span>
          {this.props.text}
        </span>
      </span>
    )
  }
}
export default Notice;
