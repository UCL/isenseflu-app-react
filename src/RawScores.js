import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';

import { Article, FormFooter } from './PublicTemplates';

const ScoreRow = (props) => {
  return (
    <tr>
      <td>{props.score_date}</td>
      <td>{props.score_value}</td>
    </tr>
  );
}

export default class RawScoresComponent extends Component {

  render() {
    let rows = undefined;
    if (this.props.modeldata.datapoints !== undefined) {
      let points = this.props.modeldata.datapoints.slice();
      rows = points.reverse().map(point => {
        return <ScoreRow key={point.score_date} {...point}></ScoreRow>
      });
    }
    return (
      <Article header="Raw Scores">
        <Table className="m-0" responsive hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>{this.props.modeldata.name} (England)</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
        <FormFooter>
          <Button>Export to CSV</Button>
        </FormFooter>
      </Article>
    );
  }
}
