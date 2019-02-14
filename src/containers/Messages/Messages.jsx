// @flow
import * as React from "react";
import "./styles.scss";
import PropTypes from "prop-types";
import { formatMessagesResponse } from './helpers/formatApiResponse';
import _ from 'lodash';
import Table from '../../components/Table';
import MessageModal from '../../components/MessageModal';
import LoadingIndicator from 'components/LoadingIndicator';

const defaultProps = {
  messagesTab: {},
  getTransactionMessages: {},
};

const propTypes = {
  messagesTab: PropTypes.object,
  getTransactionMessages: PropTypes.func,
};

class Messages extends React.Component {


  static defaultProps = defaultProps;

  static propTypes = propTypes;

  state = {
    dataTable: [],
    dataHead: [],
    modalOpen: false,
  };

  componentWillMount() {
    console.log(this.props)
    if (!this.props.messagesTab.loaded) {
      this.props.getTransactionMessages({});
    } else if (this.props.messagesTab.loaded) {
      this.setState(formatMessagesResponse(this.props));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.messagesTab.loaded
    ) {
      this.setState(formatMessagesResponse(nextProps));
    }
  }

  handleClickRow = (event, element) => {
    const { data } = this.props.messagesTab.data;

    this.setState(
      {
        modalOpen: true,
        msgDetailedData: _.find(data.messages, el => element[0].id === el.id),
      },
      () => {},
    );
  };

  onCloseModal = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const { dataTable, dataHead, modalOpen, msgDetailedData } = this.state;
    console.log(this.state);
    console.log(this.props);
    return (
      <div>
        {this.props.messagesTab.loaded ? (
          <Table
            tableBody={dataTable}
            tableHead={dataHead}
            rowOnClick={this.handleClickRow}
          />
        ) : (
          <LoadingIndicator />
        )}
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
