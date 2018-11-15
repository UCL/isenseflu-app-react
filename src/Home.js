import React from 'react';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import ChartComponent from './Chart';
import DataFilteringComponent from './DataFiltering';
import AveragesComponent from './Averages';
import { RawScores } from './RawScores';

export default class HomeComponent extends React.Component {

	state = {
		modeldata:						// For all components
			{
				parameters: {}
			}
		,
		modellist: [], 				// For toggle switches to select models being displayed
		startDate: undefined, // For DataFiltering
		endDate: undefined		// For DataFiltering
	}

  componentDidMount() {

		// Download default model
    fetch(process.env.REACT_APP_API_HOST + '/')
		.then(response => {
			if (!response.ok) { throw response };
			return response.json();
		}).then(jsondata => {
			const switchStateId = `isModelActive${jsondata.id}`;
			this.setState({
				example: true,
        modeldata: jsondata,
        startDate: jsondata.start_date,
        endDate: jsondata.end_date,
				[switchStateId]: true
      });
		});

		// Download list of models
		fetch(process.env.REACT_APP_API_HOST + '/models')
		.then(response => {
			if (!response.ok) { throw response };
			return response.json();
		}).then(jsondata => {
			this.setState({modellist: jsondata});
		});

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

	handleChangeCallback = event => {
		this.setState({
			[`isModelActive${event.target.value}`]: event.target.checked,
		});
	}

	render() {

		const { endDate, modeldata, modellist, startDate } = this.state;

		const modelToggleControls = modellist.map(model => {
			return (
				<FormGroup key={model.id}>
					<FormControlLabel
						control={
							<Switch
								value={String(model.id)}
								checked={this.state[`isModelActive${model.id}`]}
								onChange={this.handleChangeCallback}
								color="primary"/>
						}
						label={model.name}
					/>
				</FormGroup>
			);
		});

		return (
			<React.Fragment>
				<ChartComponent modeldata={modeldata} modelcontrols={modelToggleControls}/>
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
