import React, { PureComponent } from "react";
import AppBar from '@material-ui/core/AppBar';
import MaterialTabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabContainer from '../../components/TabContainer';
import Messages from '../../containers/Messages';
import "./styles.scss";

const bc = "tabs";

class Tabs extends PureComponent {
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
            <Tab label="Messages" />
            <Tab label="Flow" />
            <Tab label="QoS" />
            <Tab label="Logs" />
            <Tab label="Loki" />
            <Tab label="Export" />
          </MaterialTabs>
        </AppBar>
        {value === 0 ? <Messages/> : null}
        {value === 1 ? <TabContainer>Flow</TabContainer> : null}
        {value === 2 ? <TabContainer>Flow</TabContainer> : null}
        {value === 3 ? <TabContainer>Logs</TabContainer> : null}
        {value === 4 ? <TabContainer>Loki</TabContainer> : null}
        {value === 5 ? <TabContainer>Export</TabContainer> : null}
      </div>
    );
  }
}

export default Tabs;
