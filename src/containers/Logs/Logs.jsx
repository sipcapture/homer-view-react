// @flow
import * as React from "react";
import JsonViewer from "../../components/JsonViewer/index";

import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import LoadingIndicator from "components/LoadingIndicator";

const padding = {
  padding: "10px 20px"
};

const paddingBottom = {
  padding: "0 0 20px 0"
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
    this.props.getLogs({});
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
    const { isLoaded } = this.props;

    return (
      <Grid style={{ paddingTop: 10 }}>
        {isLoaded ? (
          <div style={padding}>{this.showJson()}</div>
        ) : (
          <LoadingIndicator />
        )}
      </Grid>
    );
  }
}

export default Logs;
