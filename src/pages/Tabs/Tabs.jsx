import React, { PureComponent } from "react";
import AppBar from "@material-ui/core/AppBar";
import MaterialTabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabContainer from "../../components/TabContainer";
import Messages from "../../containers/Messages";
import QOS from "../../containers/QoS";
import Logs from "../../containers/Logs";
import Export from "../../containers/Export";
import "./styles.scss";
import Flow from "../../containers/Flow";

import getAllUrlParams from "../../utils/urlParams";

const bc = "tabs";

class Tabs extends PureComponent {
  state = {
    value: "messages",
    availableTabs: ["messages", "flow", "qos", "logs", "export"]
  };

  componentDidMount(): void {
    this.detectTabs();
  }

  detectTabs() {
    const tabs = getAllUrlParams()["tabs"];

    if (tabs) {
      this.setState({
        availableTabs: tabs.split(",")
      });
    }
  }

  isShowTab(tabName) {
    return this.state.availableTabs.indexOf(tabName) !== -1;
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div>
        <AppBar position="static" color="default">
          <MaterialTabs
            value={value}
            onChange={this.handleChange}
            variant="fullWidth"
            scrollButtons="auto"
            indicatorColor="primary"
            textColor="primary"
          >
            {this.isShowTab("messages") ? (
              <Tab value="messages" label="Messages" />
            ) : null}
            {this.isShowTab("flow") ? <Tab value="flow" label="Flow" /> : null}
            {this.isShowTab("qos") ? <Tab value="qos" label="QoS" /> : null}
            {this.isShowTab("logs") ? <Tab value="logs" label="Logs" /> : null}
            {this.isShowTab("export") ? (
              <Tab value="export" label="Export" />
            ) : null}
          </MaterialTabs>
        </AppBar>
        {value === "messages" ? <Messages /> : null}
        {value === "flow" ? <Flow /> : null}
        {value === "qos" ? <QOS /> : null}
        {value === "logs" ? <Logs /> : null}
        {value === "export" ? <Export /> : null}
      </div>
    );
  }
}

export default Tabs;
