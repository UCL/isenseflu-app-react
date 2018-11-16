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
		modeldata: [],				// For all components
		rateThresholds: undefined,
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
        modeldata: [
					{
						id: jsondata.id,
						name: jsondata.name,
						datapoints: jsondata.datapoints
					}
				],
        startDate: jsondata.start_date,
        endDate: jsondata.end_date,
				modellist: jsondata.model_list,
				hasConfidenceInterval: jsondata.hasConfidenceInterval,
				[switchStateId]: true,
				rateThresholds: jsondata.rate_thresholds
      });
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

		const {
			endDate,
			hasConfidenceInterval,
			modeldata,
			modellist,
			rateThresholds,
			startDate
		} = this.state;

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
				<ChartComponent
					modeldata={modeldata}
					modelcontrols={modelToggleControls}
					modelannotations={rateThresholds}
					modelconfinterval={hasConfidenceInterval}
					/>
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
