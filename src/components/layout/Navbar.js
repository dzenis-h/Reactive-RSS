import React, { Component, Fragment } from "react";
import RSS_LOGO from "../../rss.png";
import { withRouter, NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";

import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";

import { AppBar, Toolbar } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

class Navbar extends Component {
  state = {
    isAuthenticated: false
  };

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;
    if (auth.uid) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  }

  onLogoutClick = e => {
    e.preventDefault();

    const { firebase, history } = this.props;
    firebase
      .logout()
      .then(() => history.push("/login"))
      .catch(err => console.log(err));
  };

  render() {
    const { isAuthenticated } = this.state;
    const { auth } = this.props;

    return (
      <Fragment>
        {" "}
        <AppBar position="static">
          <Toolbar>
            <Grid item xs={4} className="nav-left">
              <Link to="/" style={{ float: "left" }}>
                <img className="brand" src={RSS_LOGO} alt="Reactive RSS" />{" "}
                Reactive RSS
              </Link>
            </Grid>
            <Grid item xs={8}>
              {!isAuthenticated ? (
                <div className="auth-links">
                  <NavLink to="/login">Login</NavLink>
                  <NavLink to="/singup">Singup</NavLink>
                </div>
              ) : null}

              {isAuthenticated ? (
                <div className="nav-right">
                  <p>
                    Welcome,{" "}
                    <span style={{ color: "#ff3817" }}>{auth.email}</span>
                  </p>
                  <NavLink to="/add" className="add-feed">
                    Add Feed
                  </NavLink>
                  <a href="#!" className="logout" onClick={this.onLogoutClick}>
                    Logout
                  </a>
                </div>
              ) : null}
            </Grid>
          </Toolbar>
        </AppBar>
      </Fragment>
    );
  }
}

Navbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(Navbar);
