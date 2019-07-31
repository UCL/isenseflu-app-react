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
