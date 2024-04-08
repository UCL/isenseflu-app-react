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

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

import Logo from './Logo';

const isActive = (pathname) => (window.location.pathname === pathname ? 'primary' : 'inherit');

const LogoWrapper = styled('div')({ flexGrow: 1 });

const LogoSpan = styled('span')({
  display: 'inline-block',
  width: 155,
});

const NavigationBar = () => (
  <AppBar position="static" color="default" sx={{ position: 'relative' }}>
    <Toolbar>
      <LogoWrapper>
        <LogoSpan>
          <Logo />
        </LogoSpan>
      </LogoWrapper>
      <Button href="/" color={isActive('/')}>Home</Button>
      <Button href="/about" color={isActive('/about')}>About</Button>
      <Button href="/docs" color={isActive('/docs')}>Docs</Button>
      <IconButton
        aria-label="Twitter"
        href="https://www.twitter.com/fludetector"
      >
        <FontAwesomeIcon icon={faTwitter} />
      </IconButton>
    </Toolbar>
  </AppBar>
);

export { NavigationBar as default };
