import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { compose } from "redux";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { firestoreConnect } from "react-redux-firebase";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";

class AddFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedName: "",
      feedLink: "",
      enabled: true,
    };
    this.onChange = this.onChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(e) {
    const value = e.target.value;

    if (value !== "") {
      this.setState({ enabled: false });
    } else {
      this.setState({ enabled: true });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { feedName, feedLink } = this.state;
    const { uid } = this.props.auth;
    const docId = uuidv4();

    const newFeed = {
      userId: uid,
      feedName,
      feedLink,
      docId,
    };

    const { firestore, history } = this.props;

    firestore
      .collection("feeds")
      .doc(docId)
      .set(newFeed)
      .then(() => history.push("/"))
      .catch((err) => console.log(err));
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div
        style={{
          margin: "1.5rem",
          padding: "2rem",
        }}
      >
        <div>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Fab color="primary" aria-label="back">
              <i className="fas fa-arrow-circle-left fa-2x" />{" "}
            </Fab>
          </Link>
        </div>

        <div>
          <form onSubmit={this.onSubmit}>
            <TextField
              type="text"
              name="feedName"
              onChange={(e) => {
                this.handleSearchChange(e);
                this.onChange(e);
              }}
              id="standard-full-width"
              label=""
              style={{ margin: 8 }}
              placeholder="Add the name"
              helperText="NAME"
              fullWidth
              margin="normal"
              value={this.state.feedName}
            />
            <TextField
              type="text"
              name="feedLink"
              onChange={(e) => {
                this.handleSearchChange(e);
                this.onChange(e);
              }}
              id="standard-full-width"
              label=""
              style={{ margin: 8 }}
              placeholder="Add the link"
              helperText="LINK"
              fullWidth
              margin="normal"
              value={this.state.feedLink}
            />
            <div>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={this.state.enabled}
              >
                Save it{" "}
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

AddFeed.propTypes = {
  firestore: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    feeds: state.firestore.ordered.feeds,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (!props.auth.uid) return [];
    return [{ collection: "feeds" }];
  })
)(AddFeed);
