import React from 'react';
import PropTypes from 'prop-types';

import grey from '@material-ui/core/colors/grey';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import InlineFrame from './InlineFrame';

const styles = theme => ({
  paper: {
    marginBottom: theme.spacing.unit * 3,
  },
  header: {
    padding: theme.spacing.unit,
    backgroundColor: grey[50],
  },
  formToolbar: {
    backgroundColor: grey[100],
    padding: theme.spacing.unit,
  },
});

export const ArticleComponent = (props) => {
  const { classes, children, header } = props;
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={0}>
        <Grid item xs={12} className={classes.header}>
          <Typography variant="h5" component="h2">
            {header}
          </Typography>
        </Grid>
        <Grid container item xs={12}>
          {children}
        </Grid>
      </Grid>
    </Paper>
  );
};

ArticleComponent.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  header: PropTypes.string.isRequired,
};

export const Article = withStyles(styles, { withTheme: true })(ArticleComponent);


const FormFooterComponent = (props) => {
  const { classes, children } = props;
  return (
    <Toolbar variant="dense" className={classes.formToolbar} disableGutters>
      {children}
    </Toolbar>
  );
};

FormFooterComponent.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export const FormFooter = withStyles(styles)(FormFooterComponent);

export const About = () => (
  <InlineFrame title="About" src="/muistatic/about.html" height="1500px" width="100%" />
);

export const Docs = () => (
  <InlineFrame title="Docs" src="/muistatic/docs.html" height="2050px" width="100%" />
);
