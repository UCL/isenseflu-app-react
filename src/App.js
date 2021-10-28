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
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import withStyles from '@material-ui/core/styles/withStyles';

import './App.css';

import NavigationBar from './NavigationBar';
import HomeComponent from './Home';
import { About, Docs } from './PublicTemplates';

const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      body: {
        fontSize: 16,
      },
      head: {
        fontSize: 16,
      },
    },
    MuiTablePagination: {
      caption: {
        fontSize: 14,
      },
    },
    MuiFormControlLabel: {
      root: {
        paddingTop: 5,
        paddingBottom: 5,
      },
      label: {
        fontSize: 14,
      },
    },
  },
});

const styles = (aTheme) => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginTop: aTheme.spacing(4),
    marginBottom: aTheme.spacing(4),
    [aTheme.breakpoints.up(1024 + aTheme.spacing(3) * 2)]: {
      width: 1024,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});

const App = (props) => {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <header>
          <NavigationBar />
        </header>
        <main className={classes.layout}>
          <section>
            <Switch>
              <Route exact path="/" component={HomeComponent} />
              <Route exact path="/about" component={About} />
              <Route exact path="/docs" component={Docs} />
            </Switch>
          </section>
        </main>
      </MuiThemeProvider>
    </React.Fragment>
  );
};

App.propTypes = {
  /** @type {Object} CSS classes used for styling the MUI component */
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
