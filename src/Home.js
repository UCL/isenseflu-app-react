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
		modeldata: [],													// For all components
		rateThresholds: undefined,
		modellist: [], 													// For toggle switches to select models being displayed
		startDate: (new Date(0)).toISOString().substring(0,10), // For DataFiltering
		endDate: (new Date()).toISOString().substring(0,10)			// For DataFiltering
	}

  componentDidMount() {

		// Download default model or use query parameters if available (link from Twitter)
    fetch(`${process.env.REACT_APP_API_HOST}/${this.props.location.search}`)
		.then(response => {
			if (!response.ok) { throw response };
			return response.json();
		}).then(jsondata => {
			const switchStateId = `isModelActive${jsondata.id}`;
			const allDates = jsondata.datapoints.slice().map(p => {return p.score_date});
			this.setState({
        modeldata: [
					{
						id: jsondata.id,
						name: jsondata.name,
						hasConfidenceInterval: jsondata.hasConfidenceInterval,
						datapoints: jsondata.datapoints
					}
				],
        startDate: jsondata.start_date,
        endDate: jsondata.end_date,
				modellist: jsondata.model_list,
				[switchStateId]: true,
				rateThresholds: jsondata.rate_thresholds,
				allDates: allDates
      });
		});

  }

  handleUpdateModel = (updatedata) => {
    this.setState({modeldata: updatedata.modeldata});
  }

  handlePropsChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
		if (value !== undefined) {
    	this.setState({
      	[name]: value
    	});
	  }
	}

	handleChangeCallback = (event, startDate, endDate) => {
		if (event.target.checked) {
			// Download data for that particular model
			const endpoint = `/scores?id=${event.target.value}&startDate=${startDate}&endDate=${endDate}`;
			fetch(process.env.REACT_APP_API_HOST + endpoint)
			.then(response => {
				if (!response.ok) { throw response };
				return response.json();
			}).then(jsondata => {
				const addModel = {
					id: jsondata.modeldata[0].id,
					name: jsondata.modeldata[0].name,
					datapoints: jsondata.modeldata[0].datapoints,
					hasConfidenceInterval: jsondata.modeldata[0].hasConfidenceInterval
				}
				const modelDates = jsondata.modeldata[0].datapoints.slice().map(p => {return p.score_date});
				this.setState(prevState => ({
					modeldata: [...prevState.modeldata, addModel],
					allDates: [...new Set([...prevState.allDates, ...modelDates])]
				}));
				if (this.state.modeldata.startDate > jsondata.start_date) {
					this.setState({
						startDate: jsondata.start_date
					});
				};
				if (this.state.modeldata.endDate < jsondata.end_date) {
					this.setState({
						endDate: jsondata.end_date
					});
				}
			});
		} else {
			const filteredModel = this.state.modeldata.slice().filter(
				item => { return item.id !== parseInt(event.target.value) }
			);
			const filteredDates = filteredModel.map(
				m => m.datapoints
			).reduce(
				(arr, datapoint) => [...arr, ...new Set([...datapoint.map(p => p.score_date)])], []
			);
			this.setState({
				modeldata: filteredModel,
				allDates: filteredDates
			});
		}
		this.setState({
			[`isModelActive${event.target.value}`]: event.target.checked,
		});
	}

	render() {

		const {
			allDates,
			endDate,
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
								onChange={(e) => this.handleChangeCallback(e, startDate, endDate)}
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
					/>
				<DataFilteringComponent
					modelIds={modeldata.map(m => m.id)}
					startDate={startDate}
					endDate={endDate}
					updateCallback={this.handleUpdateModel}
					onChangeCallback={this.handlePropsChange}
					/>
				<AveragesComponent modeldata={modeldata}/>
				<RawScores
					modeldata={modeldata}
					allDates={allDates}
					startDate={startDate}
					endDate={endDate}/>
			</React.Fragment>
    );
  }

}
