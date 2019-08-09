/*
 * i-sense flu app: Frontend module of the i-sense flu application
 *
 * Copyright (c) 2019, UCL <https://www.ucl.ac.uk/>
 *
 * This file is part of i-sense flu app
 *
 * i-sense flu app is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * i-sense flu app is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with i-sense flu app.  If not, see <http://www.gnu.org/licenses/>.
 */

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
    marginBottom: theme.spacing(3),
  },
  header: {
    padding: theme.spacing(1),
    backgroundColor: grey[50],
  },
  formToolbar: {
    backgroundColor: grey[100],
    padding: theme.spacing(1),
  },
});

export const ArticleComponent = (props) => {
  const { classes, children, header } = props;
  return (
    <Paper className={classes.paper} elevation={2}>
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

  /** @type {Object} CSS classes used for styling the MUI component */
  classes: PropTypes.object.isRequired,

  /** @type {string} The title of the section */
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
  /** React node with the content to display within the grid */
  children: PropTypes.node.isRequired,

  /** @type {Object} CSS classes used for styling the MUI component */
  classes: PropTypes.object.isRequired,
};

export const FormFooter = withStyles(styles)(FormFooterComponent);

export const About = () => (
  <InlineFrame title="About" src="/muistatic/about.html" height="1500px" width="100%" />
);

export const Docs = () => (
  <InlineFrame title="Docs" src="/muistatic/docs.html" height="2050px" width="100%" />
);
