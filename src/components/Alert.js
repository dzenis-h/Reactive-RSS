import React, { Component } from "react";
import PropTypes from "prop-types";
import { notifyUser } from "../actions/notifyActions";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

class Alert extends Component {
  handleClose = () => {
    const { notifyUser } = this.props;
    // Clean the error state so that the <Dialog /> can be closed ;)
    notifyUser("", "");
  };

  renderAlert = () => {
    const { message, messageType } = this.props;

    return (
      <div>
        <Dialog
          open={messageType === "error" ? true : false}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <span style={{ color: "#d60000" }}> Oooopsss :(</span>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <strong>{message}</strong>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  render() {
    return <div>{this.renderAlert()}</div>;
  }
}

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  messageType: PropTypes.string.isRequired
};

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify
    }),
    { notifyUser }
  )
)(Alert);
