import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import _ from "lodash";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { v1 as uuidv1 } from "uuid";
import TableFooter from "@mui/material/TableFooter";
import styles from "./styles";
import TableHead from "./TableHead";

/* eslint-disable */
class EnhancedTable extends React.Component {
  state = {
    order: "desc",
    orderBy: "id",
    page: 0,
    rowsPerPage: 10
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy }, () => {});
  };

  handleClick = (event, id) => {
    const { rowOnClick } = this.props;

    rowOnClick(event, id);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: Number(event.target.value) });
  };

  sortData(data, order, orderBy) {
    return _.orderBy(
      data,
      row => _.find(row, el => el.key === orderBy).label,
      order
    );
  }

  render() {
    const { classes, tableBody, tableHead } = this.props;
    const { order, orderBy, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, tableBody.length - page * rowsPerPage);
    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHead
              order={order}
              orderBy={orderBy}
              data={tableHead}
              onRequestSort={this.handleRequestSort}
            />
            <TableBody>
              {this.sortData(tableBody, order, orderBy)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => (
                  <TableRow
                    hover
                    onClick={event => this.handleClick(event, n)}
                    role="checkbox"
                    tabIndex={-1}
                    key={uuidv1()}
                  >
                    {_.map(n, val => (
                      <TableCell key={uuidv1()} align="left">
                        {val.label}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={tableHead.length} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Table>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  count={tableBody.length || 0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{
                    "aria-label": "Previous Page"
                  }}
                  nextIconButtonProps={{
                    "aria-label": "Next Page"
                  }}
                  SelectProps={{
                    native: true
                  }}
                  onPageChange={this.handleChangePage}
                  onRowsPerPageChange={this.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableBody: PropTypes.array,
  tableHead: PropTypes.array,
  rowOnClick: PropTypes.func
};

export default withStyles(styles)(EnhancedTable);
