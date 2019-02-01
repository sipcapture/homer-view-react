/**
 *
 * Tabs
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import AppBar from '@material-ui/core/AppBar';
import MaterialTabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabContainer from 'components/TabContainer';
import MessagesTab from 'containers/MessagesTab/Loadable';
import makeSelectTabs from './selectors';
import reducer from './reducer';
import saga from './saga';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
});

/* eslint-disable react/prefer-stateless-function */
export class Tabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <MaterialTabs
            value={value}
            onChange={this.handleChange}
            variant="fullWidth"
            scrollButtons="auto"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Messages" />
            <Tab label="Flow" />
            <Tab label="QoS" />
            <Tab label="Logs" />
            <Tab label="Loki" />
            <Tab label="Export" />
          </MaterialTabs>
        </AppBar>
        {value === 0 ? <MessagesTab /> : null}
        {value === 1 ? <TabContainer>Flow</TabContainer> : null}
        {value === 2 ? <TabContainer>QoS</TabContainer> : null}
        {value === 3 ? <TabContainer>Logs</TabContainer> : null}
        {value === 4 ? <TabContainer>Loki</TabContainer> : null}
        {value === 5 ? <TabContainer>Export</TabContainer> : null}
      </div>
    );
  }
}

Tabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tabs: makeSelectTabs(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'tabs', reducer });
const withSaga = injectSaga({ key: 'tabs', saga });

const RootTabs = compose(
  withReducer,
  withSaga,
  withConnect,
)(Tabs);
export default withStyles(styles)(RootTabs);
