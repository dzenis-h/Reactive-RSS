import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Logo from "../logo.svg";
// import { compose } from "redux";
// import { connect } from "react-redux";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";

class EditFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      link: ""
    };
  }

  componentDidMount() {
    const { feeds } = this.props;
    const { id } = this.props.match.params;

    setTimeout(() => {
      let res = feeds.find(x => x.id === id);
      this.setState({
        id: res.id,
        name: res.feedName,
        link: res.feedLink
      });
    }, 300);
  }

  onSubmit = e => {
    e.preventDefault();

    const { firestore, history } = this.props;
    const { id } = this.props.match.params;
    const { name, link } = this.state;

    // Updated Client
    const updClient = {
      feedName: name,
      feedLink: link
    };

    // Update client in firestore
    firestore
      .update({ collection: "feeds", doc: id }, updClient)
      .then(history.push("/"));
  };

  // Delete client
  onDeleteClick = () => {
    const { feed, firestore, history } = this.props;

    firestore
      .delete({ collection: "feeds", doc: feed.id })
      .then(history.push("/"));
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, link } = this.state;

    console.log(name);

    if (name || link) {
      return (
        <div
          style={{
            margin: "1.5rem",
            padding: "2rem"
          }}
        >
          <div>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Fab color="primary" aria-label="back">
                <i className="fas fa-arrow-circle-left fa-2x" />{" "}
              </Fab>
            </Link>
          </div>

          <Button
            style={{ float: "right" }}
            color="secondary"
            aria-label="delete"
            onClick={this.onDeleteClick}
          >
            <i className="far fa-trash-alt fa-2x" style={{ margin: "2px" }} />{" "}
            DELETE
          </Button>

          <div>
            <form onSubmit={this.onSubmit}>
              <TextField
                type="text"
                name="name"
                onChange={this.onChange}
                id="standard-full-width"
                label=""
                style={{ margin: 8 }}
                placeholder="Edit name"
                helperText="NAME"
                fullWidth
                margin="normal"
                defaultValue={name}
              />
              <TextField
                type="text"
                name="link"
                onChange={this.onChange}
                id="standard-full-width"
                label=""
                style={{ margin: 8 }}
                placeholder="Edit link"
                helperText="LINK"
                fullWidth
                margin="normal"
                defaultValue={link}
              />
              <div>
                <Button variant="contained" color="secondary" type="submit">
                  Update it{" "}
                </Button>
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <img src={Logo} alt="" className="App-logo" />
        </div>
      );
    }
  }
}

EditFeed.propTypes = {
  firestore: PropTypes.object.isRequired
  //   settings: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: "feeds" },
    { collection: "feeds", storeAs: "feed", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    feeds: ordered.feeds,
    feed: ordered.feed && ordered.feed[0]
  }))
)(EditFeed);
