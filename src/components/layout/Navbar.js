import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Navbar extends Component {
  static defaultProps = {
    title: 'Student Finder',
    icon: 'fas fa-graduation-cap',
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  };

  render() {
    return (
      <nav className='navbar bg-primary'>
        <h1>
          <i className={this.props.icon}></i>
          {/* Props */}
          {this.props.title}
        </h1>
      </nav>
    );
  }
}

export default Navbar;
