import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const TableComponent = props => {
  const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  }))(TableCell);

  const StyledTableRow = withStyles(theme => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.background.default
      }
    }
  }))(TableRow);

  const useStyles = makeStyles(theme => ({
    root: {
      width: "100%",
      marginTop: theme.spacing(3),
      overflowX: "auto"
    },
    table: {
      minWidth: 700
    },
    name: {
      color: "#6666ff",
      fontWeight: 700
    },
    link: {
      color: "#cc0000"
    }
  }));

  const { feeds } = props;
  const { isEmpty } = props.auth;

  const classes = useStyles();

  // If the 'isEmpty' propery is === false that means the user is logged in
  // In other words, show the table containing the 'protected/ saved' data ;)
  if (JSON.parse(isEmpty) === false) {
    return (
      <Fragment>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <StyledTableCell className={classes.link}>
                  FEED NAME:
                </StyledTableCell>
                <StyledTableCell className={classes.name} align="right">
                  FEED URL:
                </StyledTableCell>
                <StyledTableCell align="right">EDIT</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feeds.map(feed => (
                <StyledTableRow key={feed.id}>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    className={classes.name}
                  >
                    {feed.feedName}
                  </StyledTableCell>
                  <StyledTableCell align="right" className={classes.link}>
                    {feed.feedLink}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Link to={`/edit/${feed.id}`}>
                      <i
                        className="fas fa-pencil-alt"
                        style={{ float: "right" }}
                      />
                    </Link>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <h4 className="redColor">
          NOTE: In order to add/ edit/ delete feeds you have to be logged in
        </h4>
      </Fragment>
    );
  }
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(TableComponent);
