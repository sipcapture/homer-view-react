import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { makeSelectMessagesTab } from "./selectors";
import Messages from "./Messages";
import PropTypes from "prop-types";
import { getMessages } from "./actions";


Messages.propTypes = {
  messagesTab: PropTypes.object.isRequired,
  getTransactionMessages: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  messagesTab: makeSelectMessagesTab,
});

const mapDispatchToProps = dispatch => ({
  getTransactionMessages: searchParams =>
    dispatch(getMessages(searchParams)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);

