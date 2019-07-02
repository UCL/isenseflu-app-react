import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { Article } from './PublicTemplates';

export default class AveragesComponent extends React.Component {

  render() {

    const { modeldata } = this.props;

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
              modeldata.map(item => {
                  const avg = item.data_points.map(
                    x => x.score_value
                  ).reduce(
                    (sum, score) => sum + score
                  ) / item.data_points.length;
                  return (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>England</TableCell>
                      <TableCell>{avg}</TableCell>
                    </TableRow>
                  );
                }
              )
            }
          </TableBody>
        </Table>
      </Article>
    );
  }

}
