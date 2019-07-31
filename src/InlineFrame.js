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
  /** CSS classes used for styling the MUI component */
  classes: PropTypes.object.isRequired,

  /** Height of the frame in pixels, with px suffix */
  height: PropTypes.string.isRequired,

  /** Width of the frame in pixels, with px suffix */
  width: PropTypes.string.isRequired,

  /** The URL of the page to display in the iframe */
  src: PropTypes.string.isRequired,

  /** The title for the iframe */
  title: PropTypes.string.isRequired,
};

const InlineFrame = withStyles(styles)(InlineFrameComponent);

export { InlineFrame as default };
