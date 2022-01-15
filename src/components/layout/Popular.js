import React from "react";

import Data from "../../assets/popular_list";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { CopyToClipboard } from "react-copy-to-clipboard";

const Popular = () => {
  return (
    <>
      <h3>Popular RSS feeds:</h3>
      <div style={{ width: "100%", margin: "auto" }}>
        <Paper style={{ width: 666, margin: "auto" }}>
          <Table style={{ width: 600, margin: "auto" }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "red", fontWeight: "bold" }}>
                  FEED NAME:
                </TableCell>
                <TableCell
                  align="right"
                  style={{ color: "blue", fontWeight: "bolder" }}
                >
                  FEED URL:
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Data.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ color: "red" }}
                    >
                      {item.name}
                    </TableCell>
                    <TableCell align="right" style={{ color: "blue" }}>
                      <CopyToClipboard text={item.url}>
                        <span
                          style={{ cursor: "copy" }}
                          title="Copy to clipboard"
                        >
                          {item.url}
                        </span>
                      </CopyToClipboard>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </>
  );
};

export default Popular;
