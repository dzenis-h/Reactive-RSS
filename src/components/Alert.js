import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

class Alert extends Component {
  state = {
    error: false
  };

  componentDidMount() {
    const { messageType } = this.props;
    if (messageType === "error") {
      this.setState({
        error: true
      });
    }
  }

  handleClose = () => {
    this.setState({
      error: false
    });
  };

  renderAlert = () => {
    const { message } = this.props;
    const { error } = this.state;

    return (
      <div>
        <Dialog
          open={error}
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

export default Alert;
