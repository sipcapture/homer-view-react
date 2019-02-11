/**
 *
 * MessagesTab
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Table from 'components/Table/Loadable';
import LoadingIndicator from 'components/LoadingIndicator';
import _ from 'lodash';
import { formatMessagesResponse } from './helpers/formatApiResponse';
import MessageModal from './MessageModal';
import makeSelectMessagesTab from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
/* eslint-disable react/prefer-stateless-function */
export class MessagesTab extends React.Component {
  state = {
    dataTable: [],
    dataHead: [],
    modalOpen: false,
  };

  componentWillMount() {
    if (!this.props.messagesTab.loaded) {
      // Put here parsed data
      this.props.getTransactionMessages();
    } else if (this.props.messagesTab.loaded) {
      this.setState(formatMessagesResponse(this.props));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.messagesTab.loaded &&
      !_.isEqual(this.props.messagesTab.data, nextProps.messagesTab.loaded)
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

MessagesTab.propTypes = {
  messagesTab: PropTypes.object.isRequired,
  getTransactionMessages: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  messagesTab: makeSelectMessagesTab(),
});

function mapDispatchToProps(dispatch) {
  return {
    getTransactionMessages: searchParams =>
      dispatch(actions.getMessagesAction(searchParams)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'messagesTab', reducer });
const withSaga = injectSaga({ key: 'messagesTab', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MessagesTab);
