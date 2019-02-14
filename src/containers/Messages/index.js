import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { makeSelectMessagesTab, isMessagesLoaded } from "./selectors";
import Messages from "./Messages";
import { getMessagesAsync } from "./actions";

const mapStateToProps = createStructuredSelector({
  messagesTab: makeSelectMessagesTab,
  isLoaded: isMessagesLoaded
});

const mapDispatchToProps = {
  getTransactionMessages: getMessagesAsync.request
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);

