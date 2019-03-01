import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  makeSelectMessagesTab,
  isMessagesLoaded,
  makeSelectMessages
} from "./selectors";
import Messages from "./Messages";
import { getMessagesAsync } from "./actions";

const mapStateToProps = createStructuredSelector({
  messagesTab: makeSelectMessagesTab,
  isLoaded: isMessagesLoaded,
  messages: makeSelectMessages
});

const mapDispatchToProps = {
  getTransactionMessages: getMessagesAsync.request
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);
