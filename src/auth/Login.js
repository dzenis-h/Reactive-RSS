import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { compose } from "redux";
// import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  onSubmit = e => {
    e.preventDefault();

    const { firebase } = this.props;
    const { email, password } = this.state;

    firebase
      .login({
        email,
        password
      })
      .catch(err => alert("Invalid Login Credentials", "error"));
  };

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <div>
          <Avatar style={{ margin: "auto", marginTop: "1rem" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
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
              Sign In
            </Button>
            <Grid container>
              <Grid item style={{ margin: "auto" }}>
                <Link to="/singup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default firebaseConnect()(Login);
