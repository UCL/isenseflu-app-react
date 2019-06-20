import React from 'react';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import ChartComponent from './Chart';
import DataFilteringComponent from './DataFiltering';
import AveragesComponent from './Averages';
import { RawScores } from './RawScores';
import { homeFetchUrl, homeFetchScoresUrl } from './Url';
import { homeModelData } from './JsonData';

export default class HomeComponent extends React.Component {

	state = {
		activeModels: [],
		modelData: [],													// For all components
		rateThresholds: undefined,
		modelList: [], 													// For toggle switches to select models being displayed
		startDate: (new Date(0)).toISOString().substring(0,10), // For DataFiltering
		endDate: (new Date()).toISOString().substring(0,10)			// For DataFiltering
	}

  componentDidMount() {
		const fetchUrl = homeFetchUrl(this.props.location.search);
    fetch(fetchUrl).then(response => {
			if (!response.ok) { throw response };
			return response.json();
		}).then(jsondata => {
			this.setState(homeModelData(jsondata));
		});
  }

  handleUpdateModel = (updatedata) => {
    this.setState({modelData: updatedata.modeldata});
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
			const fetchUrl = homeFetchScoresUrl(event.target.value, startDate, endDate);

			fetch(fetchUrl)
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
					modelData: [...prevState.modeldata, addModel],
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
				modelData: filteredModel,
				allDates: filteredDates
			});
		}
		this.setState({
			[`isModelActive${event.target.value}`]: event.target.checked,
		});
	}

	handleUpdatePermalink = (permalinkUrl) => {
	}

	render() {

		const {
			activeModels,
			allDates,
			endDate,
			modelData,
			modelList,
			rateThresholds,
			startDate
		} = this.state;

		const modelToggleControls = modelList.map(model => {
			return (
				<FormGroup key={model.id}>
					<FormControlLabel
						control={
							<Switch
								value={String(model.id)}
								checked={activeModels.includes(model.id)}
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
					modeldata={modelData}
					modelcontrols={modelToggleControls}
					modelannotations={rateThresholds}
					/>
				<DataFilteringComponent
					modelIds={modelData.map(m => m.id)}
					startDate={startDate}
					endDate={endDate}
					updateCallback={this.handleUpdateModel}
					onChangeCallback={this.handlePropsChange}
					permalinkCallback={this.handleUpdatePermalink}
					/>
				<AveragesComponent modeldata={modelData}/>
				<RawScores
					modeldata={modelData}
					allDates={allDates}
					startDate={startDate}
					endDate={endDate}/>
			</React.Fragment>
    );
  }

}
