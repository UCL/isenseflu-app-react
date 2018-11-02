import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

import logo from './logo.svg'

const styles = {
  appBar: {
    position: 'relative',
  },
  appLogo: {
    height: 35,
  },
  flexGrow: {
    flexGrow: 1,
  }
};

const isActive = (pathname) => {
  return (window.location.pathname === pathname) ? 'primary' : 'default';
};

class NavigationBar extends React.Component {

  render() {

    const { classes } = this.props;

    return (
      <AppBar position="static" color="default" className={classes.appBar}>

        <Toolbar>
          <div className={classes.flexGrow}>
            <img src={logo} className={classes.appLogo} alt="logo" />
          </div>
          <Button href="/" color={isActive('/')}>Home</Button>
          <Button href="/about" color={isActive('/about')}>About</Button>
          <Button href="/docs" color={isActive('/docs')}>Docs</Button>
          <IconButton
            className={classes.button}
            aria-label="Twitter"
            href="https://www.twitter.com/isenseflu"
          >
            <FontAwesomeIcon icon={faTwitter}/>
          </IconButton>
        </Toolbar>
      </AppBar>
    );

  }

};

export default withStyles(styles)(NavigationBar);
