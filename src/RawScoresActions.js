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
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { withStyles } from '@material-ui/core/styles';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5),
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = () => {
    const { onChangePage } = this.props;
    onChangePage(0);
  };

  handleBackButtonClick = () => {
    const { onChangePage, page } = this.props;
    onChangePage(page - 1);
  };

  handleNextButtonClick = () => {
    const { onChangePage, page } = this.props;
    onChangePage(page + 1);
  };

  handleLastPageButtonClick = () => {
    const { count, onChangePage, rowsPerPage } = this.props;
    onChangePage(Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  render() {
    const {
      classes, count, page, rowsPerPage, theme,
    } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  /** CSS classes used for styling the MUI component */
  classes: PropTypes.object.isRequired,

  /** Total number of rows */
  count: PropTypes.number.isRequired,

  /** Callback function to pass the new page number */
  onChangePage: PropTypes.func.isRequired,

  /** Page number */
  page: PropTypes.number.isRequired,

  /** Number of rows per page */
  rowsPerPage: PropTypes.number.isRequired,

  /** MUI theme, used to obtain direction of text */
  theme: PropTypes.object.isRequired,
};

const RawScoresActions = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

export { RawScoresActions as default };
