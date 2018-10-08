import React, {Component} from 'react';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

const isActive = (pathname) => {
  return (window.location.pathname === pathname);
};

export class NavigationBar extends Component {

  render() {
    return (
      <Navbar className="pl-0">
        <h2 className="text-muted">i-Sense Flu</h2>
        <Nav pills>
          <NavItem>
            <NavLink href="/" active={isActive("/")}>Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/about" active={isActive("/about")}>About</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/docs" active={isActive("/docs")}>Docs</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://www.twitter.com/isenseflu">
              <FontAwesomeIcon icon={faTwitter}/>
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }

};
