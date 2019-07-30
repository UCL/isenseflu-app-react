import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  framecontainer: {
    marginBottom: theme.spacing.unit * 3,
  },
  internalframe: {
    border: 'none',
  },
});

const InlineFrameComponent = (props) => {
  const {
    classes,
    height,
    width,
    src,
    title,
  } = props;

  return (
    <div className={classes.framecontainer}>
      <iframe
        title={title}
        src={src}
        height={height}
        width={width}
        className={classes.internalframe}
      />
    </div>
  );
};

InlineFrameComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const InlineFrame = withStyles(styles)(InlineFrameComponent);

export { InlineFrame as default };
