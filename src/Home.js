import React from 'react';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import ChartComponent from './Chart';
import DataFilteringComponent from './DataFiltering';
import AveragesComponent from './Averages';
import { RawScores } from './RawScores';
import { homeFetchUrl, homeFetchScoresUrl } from './Url';
import { homeModelData, homeScoresData } from './JsonData';

export default class HomeComponent extends React.Component {

	state = {
		activeModels: [],
		modelData: [],													// For all components
		rateThresholds: undefined,
		modelList: [], 													// For toggle switches to select models being displayed
		startDate: (new Date(0)).toISOString().substring(0,10), // For DataFiltering
		endDate: (new Date()).toISOString().substring(0,10),		// For DataFiltering
		permaLink: process.env.REACT_APP_API_HOST
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
				const addModel = homeScoresData(jsondata);
				this.setState(prevState => ({
					modelData: [...prevState.modelData, ...addModel.noModelDates],
					allDates: [...new Set([...prevState.allDates, ...addModel.modelDates])],
					activeModels: [...prevState.activeModels, addModel.id]
				}));
				if (this.state.modelData.startDate > addModel.startDate) {
					this.setState({ startDate: addModel.startDate });
				};
				if (this.state.modelData.endDate < addModel.endDate) {
					this.setState({	endDate: addModel.endDate });
				}
			});
		} else {
			const filteredModel = this.state.modelData.slice().filter(
				item => { return item.id !== parseInt(event.target.value) }
			);
			const filteredDates = filteredModel.map(
				m => m.datapoints
			).reduce(
				(arr, datapoint) => [...arr, ...new Set([...datapoint.map(p => p.score_date)])], []
			);
			this.setState(prevState => ({
				modelData: filteredModel,
				allDates: filteredDates,
				activeModels: prevState.activeModels.filter(id => id === event.target.value)
			}));
		}
	}

	handleUpdatePermalink = (permalinkUrl) => {
		this.setState({permaLink: permalinkUrl})
	}

	render() {

		const {
			activeModels,
			allDates,
			endDate,
			modelData,
			modelList,
			permaLink,
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
					permalink={permaLink}
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
