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

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import withStyles from '@material-ui/core/styles/withStyles';

import { Article, FormFooter } from './PublicTemplates';
import RawScoresActions from './RawScoresActions';
import ScoreRow from './ScoreRow';
import { rawScoresCsvUrl } from './Url';

const styles = () => ({

});

export const generateTableMatrix = (allDates, modeldata) => {
  const matrix = [];
  if (allDates === undefined) {
    return matrix;
  }
  allDates.forEach((ad) => {
    const scoreValues = modeldata.map((m) => {
      const { id } = m;
      const val = m.datapoints.filter(
        (p) => p.score_date === ad,
      ).map(
        (p) => p.score_value,
      );
      return {
        model_id: id,
        score_value: val[0],
      };
    });

    const row = {
      scoreDate: ad,
      modelScores: scoreValues,
    };

    matrix.push(row);
  });
  return matrix;
};

class RawScoresComponent extends React.Component {
  state = {
    page: 0,
    rowsPerPage: 10,
  }

  handleChangePage = (page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const {
      allDates, endDate, modeldata, startDate,
    } = this.props;

    const { page, rowsPerPage } = this.state;

    const totalCount = (allDates !== undefined) ? allDates.length : 0;

    return (
      <Article header="Raw Scores">
        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                {
                  modeldata.map((m) => (<TableCell key={m.id}>{`${m.name} (England)`}</TableCell>))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                generateTableMatrix(allDates, modeldata)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <ScoreRow
                      key={row.scoreDate}
                      modelScores={row.modelScores}
                      scoreDate={row.scoreDate}
                    />
                  ))
              }
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={2}
                  count={totalCount}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  backIconButtonProps={{
                    'aria-label': 'Previous Page',
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'Next Page',
                  }}
                  ActionsComponent={RawScoresActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
          <FormFooter>
            <Button
              href={rawScoresCsvUrl(modeldata, startDate, endDate)}
              variant="contained"
              download
            >
              Export to CSV
            </Button>
          </FormFooter>
        </Grid>
      </Article>
    );
  }
}

RawScoresComponent.propTypes = {
  /** @type {string[]} Array with all the dates in the time series */
  allDates: PropTypes.arrayOf(PropTypes.string).isRequired,

  /** @type {string} End date of requested time period, inclusive. In the format YYYY-MM-DD */
  endDate: PropTypes.string.isRequired,

  /** @type {Object[]} Array containing the model metadata and scores */
  modeldata: PropTypes.arrayOf(PropTypes.shape).isRequired,

  /** @type {string} Start date of requested time period, inclusive. In the format YYYY-MM-DD */
  startDate: PropTypes.string.isRequired,
};

export const RawScores = withStyles(styles)(RawScoresComponent);
