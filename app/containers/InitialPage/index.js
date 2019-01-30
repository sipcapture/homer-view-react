/*
 * InitialPage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as queryString from 'query-string';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  // makeSelectRepos,
  // makeSelectLoading,
  // makeSelectError,
  makeSelectLocation,
} from 'containers/App/selectors';
import Tabs from '../Tabs/Loadable';

import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class InitialPage extends React.PureComponent {
  componentDidMount() {
    console.log(queryString.parse(this.props.query.search));
  }

  render() {
    /* Comment some props to disable eslint errors */
    // const { loading, error, repos } = this.props;
    // const reposListProps = {
    //   loading,
    //   error,
    //   repos,
    // };

    return <Tabs />;
  }
}

InitialPage.propTypes = {
  query: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // loading: PropTypes.bool,
  // error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export function mapDispatchToProps() {
  return {};
}

const mapStateToProps = createStructuredSelector({
  query: makeSelectLocation(),
  // repos: makeSelectRepos(),
  // loading: makeSelectLoading(),
  // error: makeSelectError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'main', reducer });
const withSaga = injectSaga({ key: 'main', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(InitialPage);
