import React, { Component } from 'react';
import { Table } from 'reactstrap';

import { Article } from './PublicTemplates';

export default class AveragesComponent extends Component {

  render() {
    return (
      <Article header="Averages">
        <Table className="m-0" responsive>
          <thead>
            <tr>
              <th>Model</th>
              <th>Region</th>
              <th>Average score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Google v2.018.04</td>
              <td>England</td>
              <td>1.86123283871</td>
            </tr>
          </tbody>
        </Table>
      </Article>
    );
  }

}
