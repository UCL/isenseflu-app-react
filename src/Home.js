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
    this.handleUpdateModel = this.handleUpdateModel.bind(this);
	}

  componentDidMount() {
    fetch(process.env.REACT_APP_API_HOST + '/')
		.then(response => {
			if (!response.ok) { throw response };
			return response.json();
		}).then(jsondata => {
			this.setState({modeldata: jsondata});
		})
  }

  handleUpdateModel = (updatedata) => {
    this.setState({modeldata: updatedata});
  }

  render() {
    return (
      <React.Fragment>
        <article className="row mb-4">
          <ChartComponent modeldata={this.state.modeldata}/>
        </article>
        <article className="row mb-4">
          <DataFilteringComponent
            modelId={this.state.modeldata.id}
            startDate={this.state.modeldata.start_date}
            endDate={this.state.modeldata.end_date}
            updateCallback={this.handleUpdateModel}
            />
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
