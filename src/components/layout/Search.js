import React, { Component, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enabled: true,
      input_url: ""
    };
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

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <Fragment>
        <h4 className="blueColor">You can check your feeds here:</h4>
        <form onSubmit={this.props.getFeed}>
          <TextField
            id="outlined-with-placeholder"
            label="Link goes here:"
            placeholder="Enter a website or feed url"
            margin="normal"
            variant="outlined"
            onChange={this.handleSearchChange}
            name="feedLink"
          />
          <div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={this.state.enabled}
            >
              Show feed{" "}
            </Button>
          </div>
        </form>
        <h6 className="redColor">
          NOTE: In order to add/ edit/ delete feeds you have to be logged in!
        </h6>
      </Fragment>
    );
  }
}

export default Search;
