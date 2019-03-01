import React, { Component } from "react";
import PropTypes from "prop-types";
import mermaid from "mermaid";
import "./style.scss";

class Mermaid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      svg: null
    };

    mermaid.mermaidAPI.initialize({
      startOnLoad: false
    });
  }

  componentDidMount() {
    mermaid.mermaidAPI.render(this.props.id, this.props.content, svg => {
      this.setState({ svg });
    });
  }

  render() {
    if (!this.state.svg) {
      return <div>Loading...</div>;
    }

    return (
      <div
        className={"mermaid-diagram"}
        dangerouslySetInnerHTML={{ __html: this.state.svg }}
      />
    );
  }
}

Mermaid.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  diagramStyle: PropTypes.object
};

export default Mermaid;
