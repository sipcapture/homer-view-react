// @flow
import * as React from "react";
import Mermaid from "../../components/Mermaid";
import PropTypes from "prop-types";
import LoadingIndicator from "components/LoadingIndicator";
import Button from "@material-ui/core/Button";

const defaultProps = {
  messagesTab: {}
};

const propTypes = {
  messagesTab: PropTypes.object,
  getFlowMessages: PropTypes.func
};

const btnStyle = {
  background: "#3f51b5",
  textAlign: "left",
  color: "#fff",
  marginBottom: "18px",
  width: "178px"
};

class Flow extends React.Component {
  static defaultProps = defaultProps;

  static propTypes = propTypes;

  componentDidMount() {
    this.props.getFlowMessages({});
  }

  render() {
    const {
      messages,
      isLoaded,
      isError
    } = this.props;

    return (
      <div>
        {isLoaded && messages ? (
          <div>
            <Mermaid id="test" content={messages} />
          </div>
        ) : isError ? (
          <Button
            variant="contained"
            style={btnStyle}
            onClick={this.props.getFlowMessages}
          >
            Reload
          </Button>
        ) : <LoadingIndicator />}

      </div>
    );
  }
}

export default Flow;
