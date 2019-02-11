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

import _ from 'lodash';
import uuidv1 from 'uuid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { TimeSeries } from 'pondjs';

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
  state = {};

  componentDidMount() {
    if (!this.props.qoS.loaded) {
      this.props.getQoSData();
    } else if (this.props.qoS.loaded) {
      const qoS = _.cloneDeep(this.props.qoS.data);
      const sortedData = _.orderBy(qoS.data, 'create_date', 'asc');
      const formatedData = formateQoSApiResponse(sortedData);
      this.setState(
        { ...formatedData, series: this.createSeries(formatedData) },
        () => {
          console.log(this.state);
        },
      );
    }
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  componentWillReceiveProps(nextProps) {
    const qoS = _.cloneDeep(nextProps.qoS.data);
    const sortedData = _.orderBy(qoS.data, 'create_date', 'asc');
    const formatedData = formateQoSApiResponse(sortedData);
    this.setState({ ...formatedData, series: this.createSeries(formatedData) });
  }

  createSeries(data) {
    return new TimeSeries({
      name: 'Qos',
      columns: ['time', ..._.map(data, el => el.color)],
      points: this.formatePoints(data),
    });
  }

  formatePoints(data) {
    const clonedData = _.cloneDeep(data.reportData);
    const points = [];

    _.map(clonedData, type => {
      _.map(type.values, values => {
        if (!_.find(points, point => point[0] === values.x)) {
          points.push([values.x, values.y]);
        } else {
          points[_.findIndex(points, point => point[0] === values.x)].push(
            parseInt(values.y, 10),
          );
        }
      });
    });
    return points;
  }

  render() {
    const { _stats } = this.state;
    const { classes } = this.props;

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
            {/* <ChartContainer> */}
            {/* <ChartRow height="150"> */}
            {/* <YAxis */}
            {/* id="traffic-volume" */}
            {/* label="Traffic (B)" */}
            {/* classed="traffic-in" */}
            {/* min={0} */}
            {/* width="70" */}
            {/* type="linear" */}
            {/* /> */}
            {/* <Charts> */}
            {/* <BarChart */}
            {/* size={10} */}
            {/* offset={5.5} */}
            {/* series={series} */}
            {/* infoTimeFormat="%m/%d/%y" */}
            {/* /> */}
            {/* </Charts> */}
            {/* </ChartRow> */}
            {/* </ChartContainer> */}

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
