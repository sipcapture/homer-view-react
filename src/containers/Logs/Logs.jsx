// @flow
import * as React from "react";
import JsonViewer from "../../components/JsonViewer/index";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import LoadingIndicator from "components/LoadingIndicator";
import Card from "../QoS/QoS";

const padding = {
  padding: "10px 20px"
};

const paddingBottom = {
  padding: "0 0 20px 0"
};

const errorStyle = {
  textAlign: "center",
  marginTop: "20px"
};

const btnStyle = {
  background: "#3f51b5",
  textAlign: "center",
  color: "#fff",
  marginTop: "10px",
  marginBottom: "18px",
  width: "178px"
};

const defaultProps = {
  logsTab: {},
  logs: []
};

const propTypes = {
  logsTab: PropTypes.object,
  getLogs: PropTypes.func
};

class Logs extends React.Component {
  static defaultProps = defaultProps;

  static propTypes = propTypes;

  componentDidMount() {
    if (!this.props.isLoaded) {
      this.props.getLogs({});
    }
  }

  showJson() {
    const { logs } = this.props;

    let info = logs.map((data, index) => {
      return (
        <div style={paddingBottom} key={data.id}>
          <JsonViewer json={data} />
        </div>
      );
    });

    return <div>{info}</div>;
  }

  render() {
    const { isLoaded, isError } = this.props;

    return (
      <Grid style={{ paddingTop: 10 }}>
        {isLoaded ? (
          <div style={padding}>{this.showJson()}</div>
        ) : isError ? (
          <div style={errorStyle}>
            <span>
              Something went wrong
            </span>
            <br/>
            <Button
              variant="contained"
              style={btnStyle}
              onClick={this.props.getLogs}
            >
              Reload
            </Button>
          </div>
        ) : <LoadingIndicator />}
      </Grid>
    );
  }
}

export default Logs;
