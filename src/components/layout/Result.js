import React, { Fragment } from "react";

const Result = props => {
  return (
    <Fragment>
      <span style={{ color: "#cc0000" }}>→</span>
      <a target="_blank" rel="noopener noreferrer" href={props.link}>
        {props.title}
      </a>
      <p> {props.description}</p>
    </Fragment>
  );
};

export default Result;
