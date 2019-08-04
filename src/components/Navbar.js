import React, { Component } from "react";
import RSS_LOGO from "../rss.png";
import { Link } from "react-router-dom";
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

    const { firebase } = this.props;
    firebase
      .logout()
      .then(() => console.log("User logged out"))
      .catch(err => console.log(err));
  };

  render() {
    const { isAuthenticated } = this.state;
    const { auth } = this.props;

    return (
      <div>
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
                  <Link to="/login">Login</Link>
                  <Link to="/singup">Singup</Link>
                </div>
              ) : null}

              {isAuthenticated ? (
                <div>
                  <p>
                    Welcome,{" "}
                    <span style={{ color: "#cc0000" }}>{auth.email}</span>
                  </p>
                  <Link to="/add">Add Feed</Link>
                  <a href="#!" onClick={this.onLogoutClick}>
                    Logout
                  </a>
                </div>
              ) : null}
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(Navbar);
