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

const RawScoresActions = ({
  count,
  onPageChange,
  page,
  rowsPerPage,
}) => {
  const handleFirstPageButtonClick = () => onPageChange(0);

  const handleBackButtonClick = () => onPageChange(page - 1);

  const handleNextButtonClick = () => onPageChange(page + 1);

  const handleLastPageButtonClick = () => {
    onPageChange(Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <ActionsWrapper>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="First Page"
        size="large"
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="Previous Page"
        size="large"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Next Page"
        size="large"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Last Page"
        size="large"
      >
        <LastPageIcon />
      </IconButton>
    </ActionsWrapper>
  );
};

RawScoresActions.propTypes = {
  /** @type {number} Total number of rows */
  count: PropTypes.number.isRequired,

  /** @type {function(page: number)} Callback function to pass the new page number */
  onPageChange: PropTypes.func.isRequired,

  /** @type {number} Page number */
  page: PropTypes.number.isRequired,

  /** @type {number} Number of rows per page */
  rowsPerPage: PropTypes.number.isRequired,
};

export { RawScoresActions as default };
