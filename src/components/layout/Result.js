import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 555,
    margin: "auto",
    color: "#6666ff",
    display: "flex",
    textAlign: "center"
  }
}));

function ListItemLink(props) {
  return (
    <ListItem
      button
      component="a"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  );
}

const Result = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemIcon>
            <ArrowRightAltIcon />
          </ListItemIcon>
          <ListItemLink href={props.link}>
            <ListItemText primary={props.title} />
          </ListItemLink>
        </ListItem>
        <p> {props.description}</p>
        <Divider />
      </List>
    </div>

    /* // <Fragment>
    //   <span style={{ color: "#cc0000" }}>→</span>
    //   <a target="_blank" rel="noopener noreferrer" href={props.link}>
    //     {props.title}
    //   </a>
    //   
    // </Fragment> */
  );
};

export default Result;
