import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Tab from "@material-ui/core/Tab";
import TabContainer from "components/TabContainer/";
import uuidv1 from "uuid";
import { Rnd } from "react-rnd";
import DetailedMessage from "./_compoents/DetailedMessage";
import Details from "./_compoents/Details";

import AppBar from "@material-ui/core/AppBar";
import MaterialTabs from "@material-ui/core/Tabs";

const RootModalStyles = {};

const style = {
  display: "flex",
  border: "solid 1px #ddd",
  background: "#ffffff"
};

const swipeableViewsStyle = {
  overflow: "auto",
  width: "100%",
  maxHeight: "calc(100% - 106px)",
  marginTop: "106px"
};

const modalHeaderMenu = {
  position: "absolute",
  top: "0",
  width: "100%",
  padding: "12px 0",
  cursor: "grabbing",
  borderBottom: "1px solid #cccccc"
};

const modalTabsSelector = {
  display: "block",
  position: "absolute",
  top: "58px",
  width: "100%"
};

const marginLeft = {
  marginLeft: "15px"
};

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
    padding: "6px"
  }
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle
      className="modal-title"
      style={modalHeaderMenu}
      disableTypography
    >
      <Typography variant="h6" style={marginLeft}>
        {children}
      </Typography>
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
    width: 700,
    height: 800,
    x: 10,
    y: 1
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
      msgDetailedData
    } = this.props;
    const { value } = this.state;
    return (
      <Rnd
        style={style}
        size={{ width: this.state.width, height: this.state.height }}
        position={{ x: this.state.x, y: this.state.y }}
        bounds={"window"}
        dragHandleClassName={"modal-title"}
        onDragStop={(e, d) => {
          this.setState({ x: d.x, y: d.y });
        }}
        onResize={(e, direction, ref, delta, position) => {
          this.setState({
            width: ref.style.width,
            height: ref.style.height,
            ...position
          });
        }}
      >
        <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
          ID
        </DialogTitle>
        <AppBar>
          <MaterialTabs
            style={modalTabsSelector}
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Message" />
            <Tab label="Details" />
          </MaterialTabs>
        </AppBar>
        <div index={this.state.value} style={swipeableViewsStyle}>
          {value === 0 ? (
            <TabContainer key={uuidv1.v1()}>
              <DetailedMessage detailedData={msgDetailedData} />
            </TabContainer>
          ) : null}
          {value === 1 ? (
            <TabContainer key={uuidv1.v1()}>
              <Details tableData={msgDetailedData} />
            </TabContainer>
          ) : null}
        </div>
      </Rnd>
    );
  }
}

Modal.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
  msgDetailedData: PropTypes.object
};

export default withStyles(RootModalStyles)(Modal);
