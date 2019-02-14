import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import uuidv1 from 'uuid';
import _ from 'lodash';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function DetailedMSG(props) {
  const { detailedData } = props;
  return (
    <div>
      {_.map(detailedData.raw.split('\n'), (el, i) => (
        <div key={uuidv1.v1()}>
          <Typography component="p" key={i}>
            {el}
          </Typography>
          <br />
        </div>
      ))}
    </div>
  );
}

DetailedMSG.propTypes = {
  detailedData: PropTypes.object.isRequired,
};

export default withStyles(styles)(DetailedMSG);
