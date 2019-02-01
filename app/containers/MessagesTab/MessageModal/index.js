import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabContainer from 'components/TabContainer/';
import uuidv1 from 'uuid';
import DetailedMessage from './_compoents/DetailedMessage';
import Details from './_compoents/Details';

const RootModalStyles = {};
const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

class Modal extends React.Component {
  state = {
    value: 0,
  };

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const {
      classes,
      onClose,
      selectedValue,
      theme,
      msgDetailedData,
      ...other
    } = this.props;

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        {...other}
      >
        <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
          ID
        </DialogTitle>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Message" />
            <Tab label="Details" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer key={uuidv1.v1()}>
            <DetailedMessage detailedData={msgDetailedData} />
          </TabContainer>
          <TabContainer key={uuidv1.v1()}>
            <Details tableData={msgDetailedData} />
          </TabContainer>
        </SwipeableViews>
      </Dialog>
    );
  }
}

Modal.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
  msgDetailedData: PropTypes.object,
};

export default withStyles(RootModalStyles)(Modal);
