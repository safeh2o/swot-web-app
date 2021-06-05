import React, { Component } from "react";
import PropTypes from 'prop-types';

import signIn from "react-svg-loader!../../../../client/public/assets/icons/header-nav-login.svg";

/* create a function that will pick which icon to use */
const renderIconSwitch = (name) => {
  switch (name) {
    case 'sign-in': return signIn;
    case 'sign-out': return signOut;
    case 'plus': return plus;
    case 'download': return download;
    default: throw new Error('no SVG for: ' + name);
  }
};

class Icon extends Component {
  render() {
    const SVG = renderIconSwitch(this.props.name);
    return (<SVG preserveAspectRatio="none" viewBox={'0 0 ' + this.props.width + ' ' + this.props.height} />)
  }
}
// Set default props
Icon.defaultProps = {
  name: 'svg-icon',
  fill: 'currentColor'
};

export default Icon;