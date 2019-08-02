import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

class Register extends Component {
  state = {
    email: "",
    password: ""
  };

  onSubmit = e => {
    e.preventDefault();

    const { firebase } = this.props;
    const { email, password } = this.state;

    // Register with firebase
    firebase
      .createUser({ email, password })
      .catch(err => alert("That User Already Exists:" + err));
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <Avatar style={{ margin: "auto", marginTop: "1rem" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registration
          </Typography>
          <form onSubmit={this.onSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.onChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.onChange}
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign Up
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

Register.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    notify: state.notify
  }))
)(Register);
