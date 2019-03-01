import React from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader";

import _ from "lodash";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const payload = {
  color: "#3f51b5",
  cursor: "pointer"
};

const paddingRight = {
  padding: "0 10px 0 0"
};

const list = {
  padding: "10px 10px 10px 20px",
  background: "#e8e8e8"
};
const wordBreak = {
  wordWrap: "break-word"
};

class JsonViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hiddenBlock: false
    };

    this.showList = this.showList.bind(this);
  }

  showList() {
    this.setState({
      hiddenBlock: !this.state.hiddenBlock
    });
  }

  render() {
    const { json } = this.props;
    return (
      <Grid>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Typography style={paddingRight}>{json.srcIp}</Typography>
          <Typography onClick={this.showList} style={payload}>
            payload
          </Typography>
        </Grid>
        <Grid hidden={this.state.hiddenBlock ? true : false}>
          <Typography style={wordBreak}>{JSON.stringify(json)}</Typography>
        </Grid>

        <Grid hidden={this.state.hiddenBlock ? false : true}>
          <ul style={list}>
            {Object.keys(json).map((key, value) => (
              <Typography key={key}>
                {" "}
                <span style={payload}>{key}</span> {json[key]}
              </Typography>
            ))}
          </ul>
        </Grid>
      </Grid>
    );
  }
}

export default hot(module)(JsonViewer);
