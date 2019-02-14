// @flow
import * as React from "react";
import "./styles.scss";
import PropTypes from "prop-types";
import { formatMessagesResponse } from './helpers/formatApiResponse';
import _ from 'lodash';

const defaultProps = {
  messagesTab: {},
  getTransactionMessages: {},
};

const propTypes = {
  messagesTab: PropTypes.object,
  getTransactionMessages: PropTypes.func,
};

class Messages extends React.Component {


  static defaultProps = defaultProps;

  static propTypes = propTypes;

  state = {
    dataTable: [],
    dataHead: [],
    modalOpen: false,
  };

  componentWillMount() {
    console.log(this.props)
    if (!this.props.messagesTab.loaded) {
      // Put here parsed data
      console.log(this.props);
      this.props.getTransactionMessages({});
    } else if (this.props.messagesTab.loaded) {
      this.setState(formatMessagesResponse(this.props));
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (
      nextProps.messagesTab.loaded
    ) {
      this.setState(formatMessagesResponse(nextProps));
      console.log(this.state);
    }
  }

  handleClickRow = (event, element) => {
    const { data } = this.props.messagesTab.data;

    this.setState(
      {
        modalOpen: true,
        msgDetailedData: _.find(data.messages, el => element[0].id === el.id),
      },
      () => {},
    );
  };

  onCloseModal = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const { dataTable, dataHead, modalOpen, msgDetailedData } = this.state;
    return (
      <div>
        test
      </div>
    );
  }
}

export default Messages;
