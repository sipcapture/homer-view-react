/**
 *
 * QoS
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import LoadingIndicator from 'components/LoadingIndicator';
import {
  XAxis,
  YAxis,
  FlexibleXYPlot,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
  DiscreteColorLegend,
} from 'react-vis';
import _ from 'lodash';
import uuidv1 from 'uuid';
import moment from 'moment';
import * as d3 from 'd3-format';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import makeSelectQoS from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import formateQoSApiResponse from './helper/formateQoSApiResponse';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

/* eslint-disable react/prefer-stateless-function */
export class QoS extends React.Component {
  state = {
    useCanvas: false,
  };

  componentDidMount() {
    if (!this.props.qoS.loaded) {
      this.props.getQoSData();
    } else if (this.props.qoS.loaded) {
      const qoS = _.cloneDeep(this.props.qoS.data);
      const sortedData = _.orderBy(qoS.data, 'create_date', 'asc');
      this.setState(formateQoSApiResponse(sortedData), () => {});
    }
  }

  componentWillReceiveProps(nextProps) {
    const qoS = _.cloneDeep(nextProps.qoS.data);
    const sortedData = _.orderBy(qoS.data, 'create_date', 'asc');
    this.setState(formateQoSApiResponse(sortedData));
  }

  LegendClickItem = obj => {
    const data = _.cloneDeep(this.state.reportData);

    const filter = _.mapValues(
      data,
      o =>
        o.key === obj.title
          ? { ...o, values: _.map(o.values, val => ({ ...val, y: 0 })) }
          : o,
    );
    this.setState({ reportData: filter }, () => {});
  };

  render() {
    const { useCanvas, _labels, reportData, _stats } = this.state;
    const { classes } = this.props;
    const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;
    const reportDataCloned = _.cloneDeep(reportData);
    return (
      <div style={{ textAlign: 'center' }}>
        {this.props.qoS.loaded ? (
          <div
            style={{
              display: 'inline-block',
              paddingTop: '16px',
              position: 'relative',
            }}
          >
            <FlexibleXYPlot
              style={{ overflow: 'visible' }}
              xType="ordinal"
              stackBy="y"
              width={window.innerWidth - 400}
              height={400}
              animation="wobbly"
            >
              <DiscreteColorLegend
                style={{
                  position: 'absolute',
                  right: '-100px',
                  top: '50%',
                  textAlign: 'left',
                  transform: 'translateY(-50%)',
                }}
                orientation="horizontal"
                colorType="literal"
                onItemClick={this.LegendClickItem}
                items={_labels}
              />
              <XAxis
                tickFormat={value =>
                  moment(new Date(+value)).format('HH:mm:ss')
                }
              />
              <YAxis tickFormat={d3.format('.01f')} />

              {_.map(reportDataCloned, (el, key) => (
                <BarSeries
                  animation={{ wobbly: 3000 }}
                  key={uuidv1.v1()}
                  cluster={reportData[key].key}
                  color={reportData[key].color}
                  data={reportData[key].values}
                />
              ))}
            </FlexibleXYPlot>
            {_.map(_stats, (el, key) =>
              _.map(el, (e, k) => (
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                  key={uuidv1.v1()}
                >
                  {`${key} ${k} ${e}`}
                </Button>
              )),
            )}
          </div>
        ) : (
          <LoadingIndicator />
        )}
      </div>
    );
  }
}

QoS.propTypes = {
  getQoSData: PropTypes.func.isRequired,
  qoS: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  qoS: makeSelectQoS(),
});

function mapDispatchToProps(dispatch) {
  return {
    getQoSData: searchParams =>
      dispatch(actions.getQoSDataAction(searchParams)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'qoS', reducer });
const withSaga = injectSaga({ key: 'qoS', saga });
const styledQoS = withStyles(styles)(QoS);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(styledQoS);
