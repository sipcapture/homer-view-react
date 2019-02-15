import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { getQOSData, isQOSLoaded, makeSelectQOSTab } from "./selectors";
import QoS from "./QoS";
import { getQOSAsync } from "./actions";

const mapStateToProps = createStructuredSelector({
  qosTab: getQOSData,
  isLoaded: isQOSLoaded,
  data: makeSelectQOSTab
});

const mapDispatchToProps = {
  getQOSData: getQOSAsync.request
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QoS);

