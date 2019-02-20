import React from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

import "./styles.css";
import _ from "lodash";

import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  Resizable,
  LineChart,
  Baseline,
  Legend
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
  padding: "50px"
};

const style = {
  value: {
    stroke: "#a02c2c",
    opacity: 0.2
  },
  line: {
    stroke: "#a02c2c",
    strokeWidth: 2
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

const statBlock = {
  width: "200px",
  height: "200px"
};

const statBlockTitle = {
  textAlign: "center",
  padding: "16px",
  fontSize: "20px"
};

const statBlockValue = {
  textAlign: "center",
  padding: "50px",
  fontSize: "24px"
};

class CrossHairs extends React.Component {
  render() {
    const { x, y } = this.props;
    const style = { pointerEvents: "none", stroke: "#ccc" };
    if (!_.isNull(x) && !_.isNull(y)) {
      return (
        <g>
          <line
            style={style}
            x1={0}
            y1={y}
            x2={this.props.width}
            y2={y}/>
          <line
            style={style}
            x1={x}
            y1={0}
            x2={x}
            y2={this.props.height}/>
        </g>
      );
    } else {
      return <g/>;
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
    if (!this.props.isLoaded) {
      this.props.getQOSData({});
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  renderCharts() {
    const { _reports, _labels, reportData, _stats, bySid } = this.props.data;
    const { isPackets, isIaJitters, isHighestSeq, isOcters, isLsr } = this.state;

    let chartData = [];

    let maxValue = 0;

    let packetsPoints = [];
    let octersPoints = [];
    let highestSeqNoPoints = [];
    let IaJitterPoints = [];
    let lsrPoints = [];

    if (reportData[0] && reportData[0].values) {
      reportData[0].values.forEach((data) => {
        packetsPoints.push([data.x, data.y]);
        if (isPackets && data.y > maxValue) {
          maxValue = data.y;
        }
      });
    }

    if (reportData[1] && reportData[1].values) {
      reportData[1].values.forEach((data) => {
        octersPoints.push([data.x, data.y]);
        if (isOcters && data.y > maxValue) {
          maxValue = data.y;
        }
      });
    }

    if (reportData[2] && reportData[2].values) {
      reportData[2].values.forEach((data) => {
        highestSeqNoPoints.push([data.x, data.y]);
        if (isHighestSeq && data.y > maxValue) {
          maxValue = data.y;
        }
      });
    }

    if (reportData[3] && reportData[3].values) {
      reportData[3].values.forEach((data) => {
        IaJitterPoints.push([data.x, data.y]);
        if (isIaJitters && data.y > maxValue) {
          maxValue = data.y;
        }
      });
    }

    if (reportData[4] && reportData[4].values) {
      reportData[4].values.forEach((data) => {
        lsrPoints.push([data.x, data.y]);
        if (isLsr && data.y > maxValue) {
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
      <Resizable>
        <ChartContainer
          title="QoS"
          titleStyle={{ fill: "#555", fontWeight: 500 }}
          timeRange={packetsSeries.range()}
          format="%H:%M:%S"
          timeAxisTickCount={5}
        >
          <ChartRow height="300">
            <YAxis
              id="value"
              label="Count"
              min={0}
              max={maxValue}
              showGrid={true}
              width="60"
            />
            <Charts>
              <CrossHairs
                x={this.state.x}
                y={this.state.y}/>
              {isPackets
                ? <LineChart
                  axis="value"
                  series={packetsSeries}
                  style={style}/>
                : <Baseline
                  axis="value"
                  visible={false}/>}
              {isOcters
                ? <LineChart
                  axis="value"
                  series={octersSeries}
                  style={style}/>
                : <Baseline
                  axis="value"
                  visible={false}/>}
              {isHighestSeq
                ? <LineChart
                  axis="value"
                  series={highestSeqNoSeries}
                  style={style}/>
                : <Baseline
                  axis="value"
                  visible={false}/>}
              {isIaJitters
                ? <LineChart
                  axis="value"
                  series={IaJitterSeries}
                  style={style}/>
                : <Baseline
                  axis="value"
                  visible={false}/>}
              {isLsr
                ? <LineChart
                  axis="value"
                  series={lsrSeries}
                  style={style}/>
                : <Baseline
                  axis="value"
                  visible={false}/>}
            </Charts>
          </ChartRow>
        </ChartContainer>
      </Resizable>
    );
  }

  renderForm() {
    const { bySid } = this.props.data;
    const { isPackets, isIaJitters, isHighestSeq, isOcters, isLsr } = this.state;

    console.log(bySid);

    const graphsForms = [];

    for (let key in bySid) {
      let newData = {
        label: bySid[key].label,
        values: []
      };

      newData.values = bySid[key].values;

      graphsForms.push(newData);
    }

    const renderData = graphsForms.map((item, index) => {
      console.log(item)
      return (
        <Card key={index}>
          <CardContent>
            <FormControl>
              <FormLabel component="legend">{item.label}</FormLabel>
              <FormGroup>
                {
                  Object.keys(item.values).map((option, i) => {
                    return (
                      <FormControlLabel
                        key={option}
                        control={
                          <Checkbox
                            checked={item.values[option].selected}
                            onChange={this.handleInputChange}
                            name={option}/>
                        }
                        label={option}
                      />
                    );
                  })
                }
              </FormGroup>
            </FormControl>
          </CardContent>
        </Card>
      );
    });

    console.log(renderData);

    return (renderData);
  }

  renderStats() {
    const { _stats } = this.props.data;

    const statsList = [];

    for (let key in _stats) {
      for (let statKey in _stats[key]) {
        statsList.push({
          parentKey: key,
          key: statKey,
          value: _stats[key][statKey]
        });
      }
    }


    const listForRender = statsList.map((stat) => {
      return (
        <Grid
          key={stat.parentKey + stat.key}
          item
          xs={4}>
          <Paper style={statBlock}>
            <div style={statBlockTitle}>
              {`${stat.key} ${stat.parentKey.toUpperCase()}`}
            </div>
            <div style={statBlockValue}>
              {`${stat.value}`}
            </div>
          </Paper>
        </Grid>);
    });

    return listForRender;
  }

  render() {
    const { _reports, _labels, reportData, _stats } = this.props.data;

    return (
      <div
        style={chartContainer}
        className="chart-container">

        <Grid
          container
          spacing={24}>
          <Grid
            item
            xs>

            <Grid
              container
              spacing={24}>
              {this.renderStats()}
            </Grid>

          </Grid>
          <Grid
            item
            xs>
            <Card>
              <CardContent>
                {this.renderCharts()}
              </CardContent>
            </Card>

            <br/>

            {this.renderForm()}
          </Grid>
        </Grid>

      </div>
    );
  }
}


export default hot(module)(QOS);
