import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import withStyles from '@material-ui/core/styles/withStyles';

import './App.css';

import NavigationBar from './NavigationBar';
import HomeComponent from './Home';
import { About, Docs } from './PublicTemplates';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
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
  },
});

const styles = aTheme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginTop: aTheme.spacing.unit * 4,
    marginBottom: aTheme.spacing.unit * 4,
    [aTheme.breakpoints.up(1024 + aTheme.spacing.unit * 3 * 2)]: {
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
          <Router>
            <section>
              <Route exact path="/" component={HomeComponent} />
              <Route exact path="/about" component={About} />
              <Route exact path="/docs" component={Docs} />
            </section>
          </Router>
        </main>
      </MuiThemeProvider>
    </React.Fragment>
  );
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
