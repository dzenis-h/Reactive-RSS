import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import store from "./store";

import Dashboard from "./components/feeds/Feed_Dashboard";
import AddFeed from "./components/feeds/Add_Feed";
import EditFeed from "./components/feeds/Edit_Feed";
import Login from "./auth/Login";
import Register from "./auth/Register";

import {
  UserIsAuthenticated,
  UserIsNotAuthenticated
} from "./helpers/withAuthProtect";

import Container from "@material-ui/core/Container";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Container>
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route
                  exact
                  path="/add"
                  component={UserIsAuthenticated(AddFeed)}
                />
                <Route
                  exact
                  path="/edit/:id"
                  component={UserIsAuthenticated(EditFeed)}
                />
                <Route
                  exact
                  path="/login"
                  component={UserIsNotAuthenticated(Login)}
                />
                <Route
                  exact
                  path="/singup"
                  component={UserIsNotAuthenticated(Register)}
                />
              </Switch>
            </Container>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
