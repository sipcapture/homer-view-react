/**
 *
 * TabContainer
 *
 */

import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TabContainer;
