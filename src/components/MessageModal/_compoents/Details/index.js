/**
 *
 * Details
 *
 */
/* eslint-disable */

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import uuidv1 from "uuid";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

class DetailsTab extends React.Component {
  render() {
    const { tableData } = this.props;
    return (
      <Table>
        <TableBody>
          {_.map(tableData, (val, key) => (
            <TableRow key={uuidv1.v1()}>
              <TableCell component="th" scope="row">
                <strong>{key}</strong>
              </TableCell>
              <TableCell align="left">{val}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

DetailsTab.propTypes = {
  tableData: PropTypes.object
};

export default withStyles(styles)(DetailsTab);
