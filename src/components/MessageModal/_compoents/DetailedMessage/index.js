import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { v1 as uuidv1 } from "uuid";
import _ from "lodash";

const styles = theme => ({
  root: {
    // MUI v5 dropped the `gutters` mixin and turned `spacing` into a function,
    // so the v3 `theme.spacing.unit * n` arithmetic is gone.
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  }
});

function DetailedMSG(props) {
  const { detailedData } = props;

  console.log(detailedData);

  return (
    <div style={{ padding: 20, wordBreak: "break-word", lineHeight: "0px" }}>
      {_.map(detailedData.raw.split("\n"), (el, i) => (
        <div key={uuidv1()}>
          <Typography component="p" key={i}>
            {el}
          </Typography>
          <br />
        </div>
      ))}
    </div>
  );
}

DetailedMSG.propTypes = {
  detailedData: PropTypes.object.isRequired
};

export default withStyles(styles)(DetailedMSG);
