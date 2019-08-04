import React, { Component, Fragment } from "react";
import Parser from "rss-parser";

import Search from "../layout/Search";
import ResultList from "../layout/ResultList";
import TableComponent from "./Feed_Table";

import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import LoadingScreen from "../../helpers/Spinner";

class Dashboard extends Component {
  state = {
    episodes: null,
    fetching: false,
    program_title: null,
    program_description: null,
    program_image: null,
    error: null
  };

  getFeed = e => {
    this.setState({ fetching: !this.state.fetching });
    e.preventDefault();
    const feedLink = e.target.elements.feedLink.value;
    let parser = new Parser({
      customFields: {
        item: [["enclosure", { keepArray: true }]]
      }
    });
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

    if (feedLink) {
      (async () => {
        try {
          let feed = await parser.parseURL(`${CORS_PROXY}${feedLink}`);
          let arr = [];
          feed.items.forEach(item => {
            arr.push(item);
          });
          this.setState({
            episodes: arr,
            program_title: feed.title,
            fetching: !this.state.fetching,
            program_image: feed.image.url,
            program_description: feed.description,
            program_link: feed.link,
            error: false
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
      fetching: false
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
    const { feeds } = this.props;

    return (
      <Fragment>
        <Search
          getFeed={this.getFeed}
          onClick={() => this.setState({ fetching: true })}
        />
        {this.state.error ? this.renderAlert() : <div />}
        {!this.state.fetching ? <p /> : <LoadingScreen />}
        <ResultList
          episodes={this.state.episodes}
          program_title={this.state.program_title}
          program_description={this.state.program_description}
          program_image={this.state.program_image}
          fetching={this.props.fetching}
        />
        {feeds ? <TableComponent /> : null}
      </Fragment>
    );
  }
}

export default compose(
  firestoreConnect([{ collection: "feeds" }]),
  connect((state, props) => ({
    feeds: state.firestore.ordered.feeds
  }))
)(Dashboard);
