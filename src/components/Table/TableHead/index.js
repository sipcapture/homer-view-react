import React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";
import TableSortLabel from "@mui/material/TableSortLabel";
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
