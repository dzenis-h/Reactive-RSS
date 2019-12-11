import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: "#f1f1f1",
    marginTop: "5rem"
  },
  textOne: {
    color: "#1e90ff"
  },
  textTwo: {
    color: "#d60000"
  }
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.root}>
        <div className="container">
          <span className={classes.textOne}>Dzenis H.</span> | ©{" "}
          {new Date().getFullYear()} Copyright |{" "}
          <span className={classes.textTwo}> Reactive RSS</span>
        </div>
      </div>
    </Fragment>
  );
}
