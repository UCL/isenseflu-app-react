import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';

import { Article, FormFooter } from './PublicTemplates';

export default class RawScoresComponent extends Component {
  render() {
    return (
      <Article header="Raw Scores">
        <Table className="m-0" responsive hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Google v2.018.04 (England)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2018-05-01</td>
              <td>1.826356</td>
            </tr>
          </tbody>
        </Table>
        <FormFooter>
          <Button>Export to CSV</Button>
        </FormFooter>
      </Article>
    );
  }
}
