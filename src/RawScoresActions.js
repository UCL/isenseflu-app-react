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
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { styled } from '@mui/material/styles';

const ActionsWrapper = styled('div')(({ theme }) => ({
  flexShrink: 0,
  color: theme.palette.text.secondary,
  marginLeft: theme.spacing(2.5),
}));

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = () => {
    const { onPageChange } = this.props;
    onPageChange(0);
  };

  handleBackButtonClick = () => {
    const { onPageChange, page } = this.props;
    onPageChange(page - 1);
  };

  handleNextButtonClick = () => {
    const { onPageChange, page } = this.props;
    onPageChange(page + 1);
  };

  handleLastPageButtonClick = () => {
    const { count, onPageChange, rowsPerPage } = this.props;
    onPageChange(Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  render() {
    const {
      count, page, rowsPerPage,
    } = this.props;

    return (
      <ActionsWrapper>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
          size="large"
        >
          <FirstPageIcon />
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
          size="large"
        >
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
          size="large"
        >
          <KeyboardArrowRight />
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
          size="large"
        >
          <LastPageIcon />
        </IconButton>
      </ActionsWrapper>
    );
  }
}

TablePaginationActions.propTypes = {
  /** @type {number} Total number of rows */
  count: PropTypes.number.isRequired,

  /** @type {function(page: number)} Callback function to pass the new page number */
  onPageChange: PropTypes.func.isRequired,

  /** @type {number} Page number */
  page: PropTypes.number.isRequired,

  /** @type {number} Number of rows per page */
  rowsPerPage: PropTypes.number.isRequired,
};

// This styling definition is redundant, as it is not read. REMOVE
const RawScoresActions = styled(TablePaginationActions)(({ theme }) => ({
  flexShrink: 0,
  color: theme.palette.text.secondary,
  marginLeft: theme.spacing(2.5),
}));

export { RawScoresActions as default };
