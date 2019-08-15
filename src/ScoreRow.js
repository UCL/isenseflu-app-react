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

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const ScoreRow = (props) => {
  const { modelScores, scoreDate } = props;
  return (
    <TableRow hover>
      <TableCell>{scoreDate}</TableCell>
      { modelScores.map((s) => (<TableCell key={s.model_id}>{s.score_value}</TableCell>)) }
    </TableRow>
  );
};

ScoreRow.propTypes = {
  /** @type {Object[]} List of model scores for a particular date */
  modelScores: PropTypes.arrayOf(PropTypes.shape).isRequired,

  /** @type {string} The date for a set of scores */
  scoreDate: PropTypes.string.isRequired,
};

export { ScoreRow as default };
