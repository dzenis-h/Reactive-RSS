import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";

import LoadingScreen from "../../helpers/Spinner";

class EditFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      link: "",
      docId: "",
      isFetching: true,
    };
  }

  componentDidMount() {
    const {
      feedName,
      feedLink,
      docId,
    } = this.props.history.location.state.feed;

    setTimeout(() => {
      this.setState({
        name: feedName,
        link: feedLink,
        docId,
        isFetching: false,
      });
    }, 300);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { firestore, history } = this.props;
    const { name, link, docId } = this.state;

    // Updated Client
    const updClient = {
      feedName: name,
      feedLink: link,
    };

    // Update client in firestore
    firestore
      .update({ collection: "feeds", doc: docId }, updClient)
      .then(history.push("/"));
  };

  // Delete client
  onDeleteClick = () => {
    const { firestore, history } = this.props;
    const { docId } = this.state;

    firestore
      .delete({ collection: "feeds", doc: docId })
      .then(history.push("/"))
      .catch((err) => console.log(err));
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, link, isFetching } = this.state;

    if (!isFetching) {
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
      return <LoadingScreen />;
    }
  }
}

EditFeed.propTypes = {
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
    return [{ collection: "feeds", where: [["userId", "==", props.auth.uid]] }];
  })
)(EditFeed);
