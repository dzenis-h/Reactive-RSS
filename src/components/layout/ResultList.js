import React, { Component, Fragment } from "react";
import Result from "./Result";

class ResultList extends Component {
  renderFeedList = () => {
    return (
      <Fragment>
        <h1>
          {this.props.program_title} by {this.props.creator}
        </h1>
        <img alt={this.props.program_title} src={this.props.program_image} />
        <p>{this.props.program_description}</p>
        {this.props.feeds.map(this.returnFeeds)}
      </Fragment>
    );
  };

  returnFeeds = (feed, i) => {
    return (
      <Result
        key={i}
        index={i}
        title={feed.title}
        enclosure={feed.enclosure}
        link={feed.link ? feed.link : "json data is null or undefined"}
        image={this.props.program_image}
        description={feed.description}
      />
    );
  };

  render() {
    return (
      <Fragment>{this.props.feeds ? this.renderFeedList() : null}</Fragment>
    );
  }
}

export default ResultList;
