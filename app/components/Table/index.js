import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
// import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableHead from './TableHead';
import styles from './styles';

// let counter = 0;
// function createData(name, calories, fat, carbs, protein) {
//   counter += 1;
//   return { id: counter, name, calories, fat, carbs, protein };
// }
//
// function desc(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }
//
// function stableSort(array, cmp) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = cmp(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map(el => el[0]);
// }
//
// function getSorting(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => desc(a, b, orderBy)
//     : (a, b) => -desc(a, b, orderBy);
// }

class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'id',
    page: 0,
    rowsPerPage: 5,
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  // handleClick = (event, id) => {
  //   console.log('Clicked');
  // };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, data } = this.props;
    const { order, orderBy, rowsPerPage, page } = this.state;
    // const emptyRows =
    //   rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHead
              order={order}
              orderBy={orderBy}
              data={data.keys}
              onRequestSort={this.handleRequestSort}
            />
            <TableBody>
              {/* {stableSort(data, getSorting(order, orderBy)) */}
              {/* .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}
              {/* .map(n => { */}
              {/* const isSelected = this.isSelected(n.id); */}
              {/* return ( */}
              {/* <TableRow */}
              {/* hover */}
              {/* onClick={event => this.handleClick(event, n.id)} */}
              {/* role="checkbox" */}
              {/* aria-checked={isSelected} */}
              {/* tabIndex={-1} */}
              {/* key={n.id} */}
              {/* > */}
              {/* <TableCell component="th" scope="row" padding="none"> */}
              {/* {n.name} */}
              {/* </TableCell> */}
              {/* <TableCell align="right">{n.calories}</TableCell> */}
              {/* <TableCell align="right">{n.fat}</TableCell> */}
              {/* <TableCell align="right">{n.carbs}</TableCell> */}
              {/* <TableCell align="right">{n.protein}</TableCell> */}
              {/* </TableRow> */}
              {/* ); */}
              {/* })} */}
              {/* {emptyRows > 0 && ( */}
              {/* <TableRow style={{ height: 49 * emptyRows }}> */}
              {/* <TableCell colSpan={6} /> */}
              {/* </TableRow> */}
              {/* )} */}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
