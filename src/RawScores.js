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
    const endpointUrl = `${process.env.REACT_APP_API_HOST}/csv/${this.props.modeldata.id}`;
    const dateParam = `startDate=${this.props.modeldata.start_date}&endDate=${this.props.modeldata.end_date}`;
    const queryUrl = `${endpointUrl}?${dateParam}`;
    return (
      <Article header="Raw Scores">
        <div style={{height: 25 + 'em', overflowY: 'auto'}}>
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
        </div>
        <FormFooter>
          <Button href={queryUrl}>Export to CSV</Button>
        </FormFooter>
      </Article>
    );
  }
}
