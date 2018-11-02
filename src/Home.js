import React from 'react';

import ChartComponent from './Chart';
import DataFilteringComponent from './DataFiltering';
import AveragesComponent from './Averages';
import { RawScores } from './RawScores';

export default class HomeComponent extends React.Component {

	state = {
		modeldata: {
			parameters: {}
		},
		startDate: undefined,
		endDate: undefined
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

		const { endDate, modeldata, startDate } = this.state;

		return (
			<React.Fragment>
				<ChartComponent modeldata={modeldata}/>
				<DataFilteringComponent
					modelId={modeldata.id}
					startDate={startDate}
					endDate={endDate}
					updateCallback={this.handleUpdateModel}
					onChangeCallback={this.handlePropsChange}
					/>
				<AveragesComponent modeldata={modeldata}/>
				<RawScores modeldata={modeldata}/>
			</React.Fragment>
    );
  }

}
