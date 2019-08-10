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
            <Grid item xs={3}>
              <Link to="/" style={{ float: "left", fontSize: "2rem" }}>
                <img
                  style={{
                    float: "left",
                    height: "45px",
                    width: "45px",
                    marginRight: "10px",
                    marginTop: "auto"
                  }}
                  src={RSS_LOGO}
                  alt="Reactive RSS"
                />{" "}
                <span style={{ fontSize: "1rem", margin: "auto" }}>
                  Reactive RSS
                </span>
              </Link>
            </Grid>
            <Grid item xs={9}>
              {!isAuthenticated ? (
                <div>
                  <NavLink to="/login">Login</NavLink>
                  <NavLink to="/singup">Singup</NavLink>
                </div>
              ) : null}

              {isAuthenticated ? (
                <div>
                  <p>
                    Welcome,{" "}
                    <span style={{ color: "#cc0000" }}>{auth.email}</span>
                  </p>
                  <NavLink to="/add">Add Feed</NavLink>
                  <a href="#!" onClick={this.onLogoutClick}>
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
