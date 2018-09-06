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
              <td>{this.props.modeldata.name}</td>
              <td>England</td>
              <td>{this.props.modeldata.average_score}</td>
            </tr>
          </tbody>
        </Table>
      </Article>
    );
  }

}
