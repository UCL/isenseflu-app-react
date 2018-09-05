import React, { Component } from 'react';

import ChartComponent from './Chart';
import DataFilteringComponent from './DataFiltering';
import AveragesComponent from './Averages';
import RawScoresComponent from './RawScores';

export default class HomeComponent extends Component {

  render() {
    return (
      <React.Fragment>
        <article className="row mb-4">
          <ChartComponent/>
        </article>
        <article className="row mb-4">
          <DataFilteringComponent/>
        </article>
        <article className="row mb-4">
          <AveragesComponent/>
        </article>
        <article className="row">
          <RawScoresComponent/>
        </article>
      </React.Fragment>
    );
  }

}
