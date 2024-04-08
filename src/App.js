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
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import {
  ThemeProvider, StyledEngineProvider, createTheme, styled,
} from '@mui/material/styles';

import './App.css';

import NavigationBar from './NavigationBar';
import HomeComponent from './Home';
import { About, Docs } from './PublicTemplates';

const customTheme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        body: {
          fontSize: 16,
        },
        head: {
          fontSize: 16,
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        caption: {
          fontSize: 14,
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          paddingTop: 5,
          paddingBottom: 5,
        },
        label: {
          fontSize: 14,
        },
      },
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeComponent location={window.location} />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/docs',
    element: <Docs />,
  },
]);

const Main = styled('main')(({ theme }) => ({
  width: 'auto',
  display: 'block', // Fix IE11 issue.
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up('lg')]: {
    width: 1024,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const App = () => (
  <React.Fragment>
    <CssBaseline />
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={customTheme}>
        <header>
          <NavigationBar />
        </header>
        <Main>
          <section>
            <RouterProvider router={router} />
          </section>
        </Main>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.Fragment>
);

export { App as default };
