import React, { Component } from 'react';

import ChartComponent from './Chart';
import DataFilteringComponent from './DataFiltering';
import AveragesComponent from './Averages';
import RawScoresComponent from './RawScores';

export default class HomeComponent extends Component {

  constructor(props) {
		super(props);
		this.state = {
      modeldata: {}
    };
	}

  componentDidMount() {
    fetch('http://fmdetect.cs.ucl.ac.uk/')
		.then(response => {
			if (!response.ok) { throw response };
			return response.json();
		}).then(jsondata => {
			this.setState({modeldata: jsondata});
		})
  }

  render() {
    return (
      <React.Fragment>
        <article className="row mb-4">
          <ChartComponent modeldata={this.state.modeldata}/>
        </article>
        <article className="row mb-4">
          <DataFilteringComponent/>
        </article>
        <article className="row mb-4">
          <AveragesComponent modeldata={this.state.modeldata}/>
        </article>
        <article className="row">
          <RawScoresComponent modeldata={this.state.modeldata}/>
        </article>
      </React.Fragment>
    );
  }

}
