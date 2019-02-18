import React from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

import "./styles.css";
import _ from "lodash";

import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  Resizable,
  LineChart,
  Baseline
} from "react-timeseries-charts";

import { TimeSeries, Index } from "pondjs";


const defaultProps = {
  qosTab: {},
  getQOSData: {},
  data: []
};

const propTypes = {
  qosTab: PropTypes.object,
  getQOSData: PropTypes.func,
  data: PropTypes.object
};

const chartContainer = {
  padding: '50px',
};

const style = {
  value: {
    stroke: "#a02c2c",
    opacity: 0.2
  }
};

const baselineStyle = {
  line: {
    stroke: "steelblue",
    strokeWidth: 1,
    opacity: 0.4,
    strokeDasharray: "none"
  },
  label: {
    fill: "steelblue"
  }
};

const baselineStyleLite = {
  line: {
    stroke: "steelblue",
    strokeWidth: 1,
    opacity: 0.5
  },
  label: {
    fill: "steelblue"
  }
};

const baselineStyleExtraLite = {
  line: {
    stroke: "steelblue",
    strokeWidth: 1,
    opacity: 0.2,
    strokeDasharray: "1,1"
  },
  label: {
    fill: "steelblue"
  }
};

class CrossHairs extends React.Component {
  render() {
    const { x, y } = this.props;
    const style = { pointerEvents: "none", stroke: "#ccc" };
    if (!_.isNull(x) && !_.isNull(y)) {
      return (
        <g>
          <line style={style} x1={0} y1={y} x2={this.props.width} y2={y} />
          <line style={style} x1={x} y1={0} x2={x} y2={this.props.height} />
        </g>
      );
    } else {
      return <g />;
    }
  }
}

class QOS extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  state = {
    tracker: null,
    timerange: null,
    isPackets: true,
    isOcters: false,
    isHighestSeq: false,
    isIaJitters: false,
    isLsr: false
  };

  static defaultProps = defaultProps;

  static propTypes = propTypes;

  componentDidMount() {
    this.props.getQOSData({});
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const { _reports, _labels, reportData, _stats } = this.props.data;
    const { isPackets, isIaJitters, isHighestSeq, isOcters, isLsr } = this.state;

    let packetsPoints = [];
    let octersPoints = [];
    let highestSeqNoPoints = [];
    let IaJitterPoints = [];
    let lsrPoints = [];

    let maxValue = 0;

    if (reportData[0] && reportData[0].values) {
      reportData[0].values.forEach((data)=> {
        packetsPoints.push([data.x, data.y]);
        if (data.y > maxValue) {
          maxValue = data.y;
        }
      });
    }

    if (reportData[1] && reportData[1].values) {
      reportData[1].values.forEach((data)=> {
        octersPoints.push([data.x, data.y]);
        if (data.y > maxValue) {
          maxValue = data.y;
        }
      });
    }

    if (reportData[2] && reportData[2].values) {
      reportData[2].values.forEach((data)=> {
        highestSeqNoPoints.push([data.x, data.y]);
        if (data.y > maxValue) {
          maxValue = data.y;
        }
      });
    }

    if (reportData[3] && reportData[3].values) {
      reportData[3].values.forEach((data)=> {
        IaJitterPoints.push([data.x, data.y]);
        if (data.y > maxValue) {
          maxValue = data.y;
        }
      });
    }

    if (reportData[4] && reportData[4].values) {
      reportData[4].values.forEach((data)=> {
        lsrPoints.push([data.x, data.y]);
        if (data.y > maxValue) {
          maxValue = data.y;
        }
      });
    }

    const packetsSeries = new TimeSeries({
      name: "Packets",
      columns: ["time", "value"],
      points: packetsPoints
    });

    const octersSeries = new TimeSeries({
      name: "Octers",
      columns: ["time", "value"],
      points: octersPoints
    });

    const highestSeqNoSeries = new TimeSeries({
      name: "Highest Seq No",
      columns: ["time", "value"],
      points: highestSeqNoPoints
    });

    const IaJitterSeries = new TimeSeries({
      name: "Ia Jitter",
      columns: ["time", "value"],
      points: IaJitterPoints
    });

    const lsrSeries = new TimeSeries({
      name: "Lsr",
      columns: ["time", "value"],
      points: lsrPoints
    });


    return (
      <div
        style={chartContainer}
        className="chart-container">

        <Card>
          <CardContent>
            <Resizable>
              <ChartContainer
                title="Package lost"
                titleStyle={{ fill: "#555", fontWeight: 500 }}
                timeRange={packetsSeries.range()}
                format="'%H '%m '%S"
                timeAxisTickCount={5}
              >
                <ChartRow height="150">
                  <YAxis
                    id="price"
                    label="Count"
                    min={0}
                    max={maxValue}
                    showGrid={true}
                    width="60"
                  />
                  <Charts>
                    <CrossHairs x={this.state.x} y={this.state.y} />
                    {isPackets
                      ? <LineChart axis="price" series={packetsSeries} style={style} />
                      : <span></span>}
                    {isOcters
                      ? <LineChart axis="price" series={octersSeries} style={style} />
                      : <span></span>}
                    {isHighestSeq
                      ? <LineChart axis="price" series={highestSeqNoSeries} style={style} />
                      : <span></span>}
                    {isIaJitters
                      ? <LineChart axis="price" series={IaJitterSeries} style={style} />
                      : <span></span>}
                    {isLsr
                      ? <LineChart axis="price" series={lsrSeries} style={style} />
                      : <span></span>}
                  </Charts>
                </ChartRow>
              </ChartContainer>
            </Resizable>
          </CardContent>
        </Card>

        <br/>

        <Card>
          <CardContent>
            <FormControl component="fieldset">
              <FormLabel component="legend">Graphs</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox checked={isPackets} onChange={this.handleInputChange} name="isPackets" />
                  }
                  label="packets"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={isOcters} onChange={this.handleInputChange} name="isOcters" />
                  }
                  label="octers"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={isHighestSeq} onChange={this.handleInputChange} name="isHighestSeq" />
                  }
                  label="highest seq"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={isIaJitters} onChange={this.handleInputChange} name="isIaJitters" />
                  }
                  label="ia jitters"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={isLsr} onChange={this.handleInputChange} name="isLsr" />
                  }
                  label="lsr"
                />
              </FormGroup>
              <FormHelperText>Check graphs</FormHelperText>
            </FormControl>
          </CardContent>
        </Card>
      </div>
    );
  }
}


export default hot(module)(QOS);
