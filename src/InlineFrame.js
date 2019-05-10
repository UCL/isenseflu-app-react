import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  framecontainer: {
    marginBottom: theme.spacing.unit * 3
  },
  internalframe: {
    border: 'none'
  }
});

class InlineFrameComponent extends React.Component {

  render() {

    const {
      classes,
      height,
      width,
      src,
      title
    } = this.props;

    return(
      <div className={classes.framecontainer}>
        <iframe title={title} src={src} height={height} width={width} className={classes.internalframe}/>
      </div>
    );
  }

}

export const InlineFrame = withStyles(styles)(InlineFrameComponent);
