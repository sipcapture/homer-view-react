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
import LoadingIndicator from "components/LoadingIndicator";

import { styler } from "react-timeseries-charts";

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
  data: [],
  graphs: {}
};

const propTypes = {
  qosTab: PropTypes.object,
  getQOSData: PropTypes.func,
  toggleSelection: PropTypes.func,
  toggleSidSelection: PropTypes.func,
  data: PropTypes.object,
  graphs: PropTypes.object
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

const statBlock = {};

const statBlockTitle = {
  textAlign: "center",
  padding: "25px 0",
  minHeight: "35px",
  fontSize: "12px"
};

const statBlockValue = {
  textAlign: "center",
  padding: "50px 0",
  fontSize: "16px"
};

const widthLegend = {
  width: "49%"
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

  handleInputChange(sid, option, event) {
    const target = event.target;

    console.log(sid, option, event.target);

    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.props.toggleSelection({
      sid,
      option
    });

    this.setState({
      [name]: value
    });
  }

  handleSidChange(sid, event) {
    const target = event.target;

    console.log(sid , event.target);

    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.props.toggleSidSelection({
      sid,
    });

    this.setState({
      [name]: value
    });
  }


  renderLineList() {
    const { graphs } = this.props;

    let chartData = [];

    for (let key in graphs) {

      for (let stat in graphs[key].values) {

        let chart = {
          name: key + " " + graphs[key].values[stat].key,
          selected: graphs[key].values[stat].selected,
          color: graphs[key].values[stat].color,
          series: new TimeSeries({
            name: key + " " + graphs[key].values[stat].key,
            columns: ["time", "value"],
            points: graphs[key].values[stat].values
          })
        };

        chartData.push(chart);
      }
    }

    const lineCharts = chartData.map((chart) => {
      if (chart.selected && chart.series) {
        return (
          <LineChart
            key={chart.name}
            axis="value"
            series={chart.series}
          />
        );
      } else {
        return (
          <Baseline
            axis="value"
            visible={false}/>
        );
      }
    });

    return (
      <Charts>
        <CrossHairs
          x={this.state.x}
          y={this.state.y}/>
        {lineCharts}
      </Charts>
    );
  }

  renderCharts() {
    const { reportData } = this.props.data;
    const { graphs } = this.props;

    let maxValue = 0;
    let packetsPoints = [];

    if (reportData[0] && reportData[0].values) {
      reportData[0].values.forEach((data) => {
        packetsPoints.push([data.x, data.y]);
      });
    }

    const packetsSeries = new TimeSeries({
      name: "Packets",
      columns: ["time", "value"],
      points: packetsPoints
    });

    for (let key in graphs) {

      for (let stat in graphs[key].values) {
        graphs[key].values[stat].values.forEach((value) => {
          if (graphs[key].values[stat].selected && value[1] > maxValue) {
            maxValue = value[1]
          }
        })
      }
    }

    console.log(packetsSeries.range())

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
            {this.renderLineList()}
          </ChartRow>
        </ChartContainer>
      </Resizable>
    );
  }

  renderForm() {
    const { graphs } = this.props;

    const graphsForms = [];

    for (let key in graphs) {
      let newData = {
        label: graphs[key].label,
        sid: key,
        selected: graphs[key].selected,
        values: []
      };
      newData.values = graphs[key].values;
      graphsForms.push(newData);
    }

    const renderData = graphsForms.map((item, index) => {
      return (
        <Card
          key={index}
          style={widthLegend}>
          <CardContent>
            <FormControl>
              <FormLabel component="legend">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={item.selected}
                      onChange={(e) => this.handleSidChange(item.sid, e)}
                      name={item.label}/>
                  }
                  label={item.label}
                />
              </FormLabel>
              <FormGroup>
                {
                  Object.keys(item.values).map((option, i) => {
                    return (
                      <FormControlLabel
                        key={option}
                        control={
                          <div>
                            <Checkbox
                              checked={item.values[option].selected}
                              onChange={(e) => this.handleInputChange(item.sid, option, e)}
                              name={option}/>
                            {/*<div*/}
                              {/*style={{*/}
                                {/*color: item.values[option].color,*/}
                                {/*display: 'inline-block'*/}
                              {/*}}*/}
                              {/*>*/}
                              {/*Color*/}
                            {/*</div>*/}
                          </div>
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
          lg={4}
          md={4}
          sm={4}
          xs={4}>
          <Paper style={statBlock}>
            <Typography style={statBlockTitle}>
              {`${stat.key} ${stat.parentKey.toUpperCase()}`}
            </Typography>
            <Typography style={statBlockValue}>
              {`${stat.value}`}
            </Typography>
          </Paper>
        </Grid>);
    });

    return listForRender;
  }

  render() {
    const { isLoaded } = this.props;

    return (
      <div
        style={chartContainer}
        className="chart-container">
        {isLoaded ? (
          <Grid
            container
            spacing={24}>
            <Grid
              item
              lg={4}
              md={4}
              sm={12}
              xs={12}>
              <Grid
                container
                spacing={24}>
                {this.renderStats()}
              </Grid>
            </Grid>
            <Grid
              item
              lg={8}
              md={8}
              sm
              xs>
              <Card>
                <CardContent>
                  {this.renderCharts()}
                </CardContent>
              </Card>
              <br/>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="space-between"
              >
                {this.renderForm()}
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <LoadingIndicator/>
        )}
      </div>
    );
  }
}


export default hot(module)(QOS);
