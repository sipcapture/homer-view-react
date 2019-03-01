import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { makeSelectLogs, makeSelectLogsTab, isLogsLoaded } from "./selectors";
import Logs from "./Logs";
import { getLogsAsync } from "./actions";

const mapStateToProps = createStructuredSelector({
  logsTab: makeSelectLogsTab,
  isLoaded: isLogsLoaded,
  logs: makeSelectLogs
});

const mapDispatchToProps = {
  getLogs: getLogsAsync.request
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logs);
