import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddFeed from "./components/AddFeed";
import EditFeed from "./components/EditFeed";
import Container from "@material-ui/core/Container";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            {/* <div className="container"> */}
            <Container>
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/add" component={AddFeed} />
                <Route exact path="/edit/:id" component={EditFeed} />
                {/* <Route exact path="/singup" component={Singup} /> */}
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
