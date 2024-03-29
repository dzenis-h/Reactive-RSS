import React, { Component, Fragment } from "react";
import Parser from "rss-parser";

import Search from "../layout/Search";
import ResultList from "../layout/ResultList";
import MainTableComponent from "./Feed_Table";
import Popular from "../layout/Popular";

import LoadingScreen from "../../helpers/Spinner";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

class Dashboard extends Component {
  state = {
    feeds: null,
    fetching: false,
    program_title: null,
    program_description: null,
    program_image: null,
    error: null,
  };

  getFeed = (e) => {
    this.setState({ fetching: !this.state.fetching });
    e.preventDefault();
    const feedLink = e.target.elements.feedLink.value;
    let parser = new Parser({
      customFields: {
        item: [["enclosure", { keepArray: true }]],
      },
    });
    // const CORS_PROXY = "https://thingproxy.freeboard.io/fetch/";

    if (feedLink) {
      (async () => {
        try {
          // let feed = await parser.parseURL(`${CORS_PROXY}${feedLink}`);
          let feed = await parser.parseURL(`${feedLink}`);
          let arr = [];
          feed.items.forEach((item) => {
            arr.push(item);
          });
          const newArr = arr.slice(0, 10); // limit the output to 10
          this.setState({
            feeds: newArr,
            program_title: feed.title,
            fetching: !this.state.fetching,
            program_image: feed.image.url,
            program_description: feed.description,
            program_link: feed.link,
            error: false,
          });
        } catch (err) {
          console.log(err);
          this.setState({ error: true, fetching: false });
        }
      })();
    } else {
      return;
    }
  };

  handleClose = () => {
    this.setState({
      error: false,
      fetching: false,
    });
  };

  renderAlert = () => {
    return (
      <Fragment>
        <Dialog
          open={this.state.error}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Error Parsing Feed</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please try retyping your RSS feed, or try a new one.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  };

  render() {
    const {
      auth: { isEmpty },
    } = this.props;
    const empty = isEmpty ? JSON.parse(isEmpty) : null;

    return (
      <Fragment>
        <Search
          getFeed={this.getFeed}
          onClick={() => this.setState({ fetching: true })}
        />
        {this.state.error ? this.renderAlert() : <div />}
        {!this.state.fetching ? <p /> : <LoadingScreen />}
        <ResultList
          feeds={this.state.feeds}
          program_title={this.state.program_title}
          program_description={this.state.program_description}
          program_image={this.state.program_image}
          fetching={this.props.fetching}
        />
        {!empty ? (
          <MainTableComponent feeds={this.props.feeds} />
        ) : (
          <Fragment>
            <br />
            <hr />
            <Popular />
            <h4 className="redColor">
              NOTE: In order to add/ edit/ delete feeds you have to be logged
              in.
            </h4>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

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
)(Dashboard);
