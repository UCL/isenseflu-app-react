import React, { Component } from 'react';

import ChartComponent from './Chart';
import DataFilteringComponent from './DataFiltering';
import AveragesComponent from './Averages';
import RawScoresComponent from './RawScores';

export default class HomeComponent extends Component {

  constructor(props) {
		super(props);
		this.state = {
      modeldata: {
				parameters: {}
			},
      startDate: undefined,
      endDate: undefined
    };
    this.handleUpdateModel = this.handleUpdateModel.bind(this);
    this.handlePropsChange = this.handlePropsChange.bind(this);
	}

  componentDidMount() {
    fetch(process.env.REACT_APP_API_HOST + '/')
		.then(response => {
			if (!response.ok) { throw response };
			return response.json();
		}).then(jsondata => {
			this.setState({
        modeldata: jsondata,
        startDate: jsondata.start_date,
        endDate: jsondata.end_date
      });
		})
  }

  handleUpdateModel = (updatedata) => {
    this.setState({modeldata: updatedata});
  }

  handlePropsChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
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
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            updateCallback={this.handleUpdateModel}
            onChangeCallback={this.handlePropsChange}
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
