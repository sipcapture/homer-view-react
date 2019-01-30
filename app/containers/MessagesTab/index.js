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
import makeSelectMessagesTab from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';

/* eslint-disable react/prefer-stateless-function */
export class MessagesTab extends React.Component {
  componentDidMount() {
    if (!this.props.messagesTab.loaded) {
      console.log(this.props.messagesTab.loaded);
      // Put here parsed data
      this.props.getTransactionMessages();
    }
  }

  render() {
    return (
      <div>
        {this.props.messagesTab.loaded ? (
          <Table data={this.props.messagesTab.data} />
        ) : (
          <LoadingIndicator />
        )}
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
