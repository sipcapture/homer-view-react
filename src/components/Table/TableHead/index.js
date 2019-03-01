import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import PropTypes from "prop-types";
import _ from "lodash";
export default class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { data, order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {_.map(data, val => (
            <TableCell
              key={val.key}
              align="left"
              sortDirection={orderBy === val.key ? order : false}
            >
              <Tooltip title="Sort" placement="bottom-start" enterDelay={300}>
                <TableSortLabel
                  active={orderBy === val.key}
                  direction={order}
                  onClick={this.createSortHandler(val.key)}
                >
                  {val.label}
                </TableSortLabel>
              </Tooltip>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  data: PropTypes.array,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
};
