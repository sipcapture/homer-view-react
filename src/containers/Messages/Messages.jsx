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
    modalOpen: false,
  };

  componentDidMount() {
    this.props.getTransactionMessages({});
  }

  handleClickRow = (event, element) => {
    const { messages: { data } } = this.props;

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
    const { messagesTab: { dataTable, dataHead }, isLoaded } = this.props;
    const { modalOpen, msgDetailedData } = this.state;
    return (
      <div>
        {isLoaded ? (
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
