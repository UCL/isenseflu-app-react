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

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { Article, FormFooter } from './PublicTemplates';
import RawScoresActions from './RawScoresActions';
import ScoreRow from './ScoreRow';
import { rawScoresCsvUrl } from './Url';

export const generateTableMatrix = (allDates, modeldata) => {
  const matrix = [];
  if (allDates === undefined || allDates.length === 0) {
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

const RawScoresComponent = ({
  allDates, endDate, modeldata, resolution, startDate,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (pageNumber) => setPage(pageNumber);

  const handleChangeRowsPerPage = (event) => setRowsPerPage(event.target.value);

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
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
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
            href={rawScoresCsvUrl(modeldata, startDate, endDate, resolution)}
            variant="contained"
            download
          >
            Export to CSV
          </Button>
        </FormFooter>
      </Grid>
    </Article>
  );
};

RawScoresComponent.propTypes = {
  /** @type {string[]} Array with all the dates in the time series */
  allDates: PropTypes.arrayOf(PropTypes.string).isRequired,

  /** @type {string} End date of requested time period, inclusive. In the format YYYY-MM-DD */
  endDate: PropTypes.string.isRequired,

  /** @type {String} Whether the CSV files should include weekly (true) or daily (false) data */
  resolution: PropTypes.string.isRequired,

  /** @type {Object[]} Array containing the model metadata and scores */
  modeldata: PropTypes.arrayOf(PropTypes.shape).isRequired,

  /** @type {string} Start date of requested time period, inclusive. In the format YYYY-MM-DD */
  startDate: PropTypes.string.isRequired,
};

export { RawScoresComponent as RawScores };
