// @flow
import * as React from "react";
import "./styles.scss";
import PropTypes from "prop-types";
import _ from "lodash";
import Table from "../../components/Table";
import MessageModal from "../../components/MessageModal";
import LoadingIndicator from "components/LoadingIndicator";
import Button from "@material-ui/core/Button";

const defaultProps = {
  messagesTab: {}
};

const propTypes = {
  messagesTab: PropTypes.object,
  getTransactionMessages: PropTypes.func
};

const btnStyle = {
  background: "#3f51b5",
  textAlign: "left",
  color: "#fff",
  marginBottom: "18px",
  width: "178px"
};

class Messages extends React.Component {
  static defaultProps = defaultProps;

  static propTypes = propTypes;

  state = {
    modalOpen: false
  };

  componentDidMount() {
    if (!this.props.isLoaded) {
      this.props.getTransactionMessages({});
    }
  }

  handleClickRow = (event, element) => {
    const {
      messages: { data }
    } = this.props;

    this.setState(
      {
        modalOpen: true,
        msgDetailedData: _.find(data.messages, el => element[0].id === el.id)
      },
      () => {}
    );
  };

  onCloseModal = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const {
      messagesTab: { dataTable, dataHead },
      isLoaded, isError
    } = this.props;
    const { modalOpen, msgDetailedData } = this.state;
    return (
      <div style={{ paddingTop: 10 }}>
        {isLoaded ? (
          <Table
            tableBody={dataTable}
            tableHead={dataHead}
            rowOnClick={this.handleClickRow}
          />
        ) : isError ? (
          <Button
            variant="contained"
            style={btnStyle}
            onClick={this.props.getTransactionMessages}
          >
            Reload
          </Button>
        ) : <LoadingIndicator />}

        {modalOpen ? (
          <MessageModal
            open={modalOpen}
            onClose={this.onCloseModal}
            msgDetailedData={msgDetailedData}
          />
        ) : null}
      </div>
    );
  }
}

export default Messages;
