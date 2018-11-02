import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

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
});

const styles = (theme) => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
    [theme.breakpoints.up(1024 + theme.spacing.unit * 3 * 2)]: {
      width: 1024,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});

class App extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <header>
            <NavigationBar/>
          </header>
          <main className={classes.layout}>
            <Router>
              <section>
                <Route exact path="/" component={HomeComponent}/>
                <Route exact path="/about" component={About}/>
                <Route exact path="/docs" component={Docs}/>
              </section>
            </Router>
          </main>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
