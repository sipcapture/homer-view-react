import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { makeSelectFlowTab, isFlowLoaded, makeSelectFlow } from "./selectors";
import Flow from "./Flow";
import { getFlowAsync } from "./actions";

const mapStateToProps = createStructuredSelector({
  messagesTab: makeSelectFlowTab,
  isLoaded: isFlowLoaded,
  messages: makeSelectFlow
});

const mapDispatchToProps = {
  getFlowMessages: getFlowAsync.request
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Flow);

