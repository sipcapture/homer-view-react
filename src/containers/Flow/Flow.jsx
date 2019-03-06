// @flow
import * as React from "react";
import Mermaid from "../../components/Mermaid";
import PropTypes from "prop-types";
import LoadingIndicator from "components/LoadingIndicator";

const defaultProps = {
  messagesTab: {}
};

const propTypes = {
  messagesTab: PropTypes.object,
  getFlowMessages: PropTypes.func
};

function formatData(messages = []) {
  messages.sort(function(a, b) {
    return parseInt(a.micro_ts, 10) - parseInt(b.micro_ts, 10);
  });

  // Create a mermaid diagram
  let output = "sequenceDiagram\n";

  // Convert HEP events to mermaid rows
  messages.forEach(set => {
    if (set.method || set.event) {
      output +=
        set.srcIp +
        "/" +
        set.srcPort +
        "->>" +
        set.dstIp +
        "/" +
        set.dstPort +
        ": " +
        (set.method || set.event) +
        "\n";
    } else {
      output +=
        set.srcIp +
        "/" +
        set.srcPort +
        "->>" +
        set.dstIp +
        "/" +
        set.dstPort +
        ": UNKNOWN\n";
    }
  });

  return output;
}

class Flow extends React.Component {
  static defaultProps = defaultProps;

  static propTypes = propTypes;

  componentDidMount() {
    this.props.getFlowMessages({});
  }

  render() {
    const {
      messages: {
        data: { messages }
      },
      isLoaded
    } = this.props;

    const content = formatData(messages);

    return (
      <div>
        {isLoaded ? (
          <div>
            <Mermaid id="test" content={content} />
          </div>
        ) : (
          <LoadingIndicator />
        )}
      </div>
    );
  }
}

export default Flow;
