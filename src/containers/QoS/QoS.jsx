import React from "react";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
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
} from "react-timeseries-charts";

import { TimeSeries } from "pondjs";

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
  padding: "25px"
};

const statBlockTitle = {
  textAlign: "center",
  padding: "6px 0",
  fontSize: "12px"
};

const statBlockValue = {
  textAlign: "center",
  padding: "5px 0 10px 0px",
  fontSize: "18px",
  fontWeight: "bold"
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
    if (!this.props.isLoaded) {
      this.props.getQOSData({});
    }
  }

  handleInputChange(sid, option, event) {
    const target = event.target;
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
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.props.toggleSidSelection({
      sid
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

    const lineCharts = chartData.map(chart => {
      if (chart.selected && chart.series) {
        const style = styler([{ key: "value", color: chart.color, width: 3 }]);

        return (
          <LineChart
            key="value"
            columns={["value"]}
            axis="value"
            series={chart.series}
            style={style}
          />
        );
      } else {
        return <Baseline axis="value" visible={false} />;
      }
    });

    return (
      <Charts>
        <CrossHairs x={this.state.x} y={this.state.y} />
        {lineCharts}
      </Charts>
    );
  }


  handleTimeRangeChange = timerange => {
    this.setState({
      timerange
    })
  };

  renderCharts() {
    const { reportData } = this.props.data;
    const { graphs } = this.props;
    let { timerange } = this.state;

    let maxValue = 0;
    let packetsPoints = [];

    let max = [0, 0];
    let min = [0, 0];


    for (let key in graphs) {
      for (let stat in graphs[key].values) {
        // eslint-disable-next-line
        graphs[key].values[stat].values.forEach(value => {
          if (graphs[key].values[stat].selected) {
            if (value[1] > maxValue) {
              maxValue = value[1];
            }

            if (min[0] == 0) {
              min = value;
            }

            if (value[0] > max[0]) {
              max = value;
            }
          }
        });
      }
    }

    const packetsSeries = new TimeSeries({
      name: "Packets",
      columns: ["time", "value"],
      points: [min, max]
    });

    if (!timerange) {
      this.setState({
        timerange: packetsSeries.range()
      });
      timerange = packetsSeries.range();
    }

    return (
      <Resizable>
        <ChartContainer
          titleStyle={{ fill: "#555", fontWeight: 500 }}
          timeRange={timerange}
          timeAxisStyle={{
            ticks: {
              stroke: "#AAA",
              opacity: 0.25,
              "stroke-dasharray": "1,1"
              // Note: this isn't in camel case because this is
              // passed into d3's style
            },
            values: {
              fill: "#AAA",
              "font-size": 12
            }
          }}
          timeAxisAngledLabels={true}
          enablePanZoom={true}
          minDuration={200}
          timeAxisHeight={60}
          onTimeRangeChanged={this.handleTimeRangeChange}
          timeAxisTickCount={5}
        >
          <ChartRow height="400">
            <YAxis
              id="value"
              min={0}
              max={maxValue}
              showGrid={true}
              width="50"
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
        <Grid
          item lg={6} md={6} sm={12} xs={12}
          key={index} style={widthLegend}>
          <Card>
          <CardContent>
            <FormControl>
              <FormLabel component="legend">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={item.selected}
                      onChange={e => this.handleSidChange(item.sid, e)}
                      name={item.label}
                    />
                  }
                  label={item.label}
                />
              </FormLabel>
              <FormGroup>
                {Object.keys(item.values).map((option, i) => {
                  return (
                    <FormControlLabel
                      key={option}
                      control={
                        <div>
                          <Checkbox
                            checked={item.values[option].selected}
                            onChange={e =>
                              this.handleInputChange(item.sid, option, e)
                            }
                            name={option}
                          />
                          <div
                            style={{
                              background: item.values[option].color,
                              borderRadius: "4px",
                              display: "inline-block",
                              height: 3,
                              marginRight: 2,
                              verticalAlign: "middle",
                              width: 20
                            }}
                          />
                        </div>
                      }
                      label={option}
                    />
                  );
                })}
              </FormGroup>
            </FormControl>
          </CardContent>
          </Card>
        </Grid>
      );
    });

    return renderData;
  }

  getStatColor(key) {
    let color = "#e8eaf6";

    if (key.toLowerCase()  === "packets") {
      color = "#ede7f6"
    }

    if (key.toLowerCase()  === "octets") {
      color = "#e1f5fe"
    }

    if (key.toLowerCase()  === "ia_jitter") {
      color = "#e0f2f1"
    }

    if (key.toLowerCase() === "highest_seq_no") {
      color = "#f3e5f5"
    }

    return {
      backgroundColor: color
    };
  }

  renderStats() {
    const { _stats } = this.props.data;

    const statsList = [];

    for (let key in _stats) {
      for (let statKey in _stats[key]) {
        statsList.push({
          parentKey: key,
          key: statKey,
          value: _stats[key][statKey],
        });
      }
    }

    const listForRender = statsList.map(stat => {
      return (
        <Grid key={stat.parentKey + stat.key} item lg={4} md={4} sm={4} xs={4}>
          <Paper style={this.getStatColor(stat.parentKey)}>
            <Typography style={statBlockTitle}>
              {`${stat.key} ${stat.parentKey.toUpperCase()}`}
            </Typography>
            <Typography style={statBlockValue}>{`${stat.value}`}</Typography>
          </Paper>
        </Grid>
      );
    });

    return listForRender;
  }

  render() {
    const { isLoaded } = this.props;

    return (
      <div style={chartContainer} className="chart-container">
        {isLoaded ? (
          <Grid container spacing={24}>
            <Grid item lg={7} md={7} sm xs spacing={24}>
              <Card>
                <CardContent>{this.renderCharts()}</CardContent>
              </Card>
              <br />
              <Grid container spacing={24}>
                {this.renderForm()}
              </Grid>
            </Grid>
            <Grid item lg={5} md={5} sm={12} xs={12}>
              <Grid container spacing={24}>
                {this.renderStats()}
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <LoadingIndicator />
        )}
      </div>
    );
  }
}

export default hot(module)(QOS);
