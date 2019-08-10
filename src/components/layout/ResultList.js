import React, { Component, Fragment } from "react";
import Result from "./Result";

class ResultList extends Component {
  renderEpisodeList = () => {
    return (
      <Fragment>
        <h1>
          {this.props.program_title} by {this.props.creator}
        </h1>
        <img alt="" src={this.props.program_image} />
        <p>{this.props.program_description}</p>
        {this.props.episodes.map(this.returnEpisodes)}
      </Fragment>
    );
  };

  returnEpisodes = (episode, i) => {
    return (
      <Result
        key={i}
        index={i}
        title={episode.title}
        enclosure={episode.enclosure}
        link={episode.link ? episode.link : "json data is null or undefined"}
        image={this.props.program_image}
        description={episode.description}
      />
    );
  };

  render() {
    return <div>{this.props.episodes ? this.renderEpisodeList() : null}</div>;
  }
}

export default ResultList;
