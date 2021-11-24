import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { logoutActionCreator } from '../actions/action';
import { connect } from 'react-redux';


const mapDispatchToProps = dispatch => ({
  submitLogout: () => dispatch(logoutActionCreator())
});

class NavBar extends Component {
  render() {
    return (
      <nav>
        <Link to='/'>GTSR</Link>
        <Link to='/view'>View All</Link>
        <Link to='/add'>Create</Link>
        {/* Added a logout button */}
        <Link onClick = {this.props.submitLogout} to='/'>Logout</Link>
      </nav>
    );
  }
}

//export default NavBar;
export default connect(null, mapDispatchToProps)(NavBar);
