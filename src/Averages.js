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
            <TableRow>
              <TableCell>{modeldata.name}</TableCell>
              <TableCell>England</TableCell>
              <TableCell>{modeldata.average_score}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Article>
    );
  }

}
