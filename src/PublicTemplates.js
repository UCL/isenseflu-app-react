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

import grey from '@mui/material/colors/grey';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import InlineFrame from './InlineFrame';

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const HeaderGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: grey[50],
}));

export const ArticleComponent = (props) => {
  const { children, header } = props;
  return (
    <StyledPaper elevation={2}>
      <Grid container spacing={0}>
        <HeaderGrid item xs={12}>
          <Typography variant="h5" component="h2">
            {header}
          </Typography>
        </HeaderGrid>
        <Grid container item xs={12}>
          {children}
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

ArticleComponent.propTypes = {
  /** React node with the content to display within the grid */
  children: PropTypes.node.isRequired,

  /** @type {string} The title of the section */
  header: PropTypes.string.isRequired,
};

export { ArticleComponent as Article };

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: grey[100],
  padding: theme.spacing(1),
}));

const FormFooterComponent = (props) => {
  const { children } = props;
  return (
    <StyledToolbar variant="dense" disableGutters>
      {children}
    </StyledToolbar>
  );
};

FormFooterComponent.propTypes = {
  /** React node with the content to display within the grid */
  children: PropTypes.node.isRequired,
};

export { FormFooterComponent as FormFooter };

export const About = () => (
  <InlineFrame title="About" src="/muistatic/about.html" height="1650px" width="100%" />
);

export const Docs = () => (
  <InlineFrame title="Docs" src="/muistatic/docs.html" height="2050px" width="100%" />
);
