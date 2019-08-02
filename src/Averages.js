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

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { Article } from './PublicTemplates';

/** Calculates the average score for a model and displays the data in a table */
const AveragesComponent = (props) => {
  const { modeldata } = props;

  return (
    <Article header="Averages">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Model</TableCell>
            <TableCell>Region</TableCell>
            <TableCell>Average score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            modeldata.map((item) => {
              const avg = item.datapoints.map(
                x => x.score_value,
              ).reduce(
                (sum, score) => sum + score,
              ) / item.datapoints.length;
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>England</TableCell>
                  <TableCell>{avg}</TableCell>
                </TableRow>
              );
            })
          }
        </TableBody>
      </Table>
    </Article>
  );
};

AveragesComponent.propTypes = {
  /** Array containing the model metadata and scores */
  modeldata: PropTypes.array.isRequired,
};

export { AveragesComponent as default };
