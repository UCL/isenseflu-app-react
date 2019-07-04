import React from 'react';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import ChartComponent from './Chart';
import DataFilteringComponent from './DataFiltering';
import AveragesComponent from './Averages';
import { RawScores } from './RawScores';
import { homeFetchUrl, homeFetchScoresUrl, homePermalinkUrl } from './Url';
import { homeModelData, homeScoresData } from './JsonData';

export default class HomeComponent extends React.Component {

	state = {
		activeModels: [],
		modelData: [],													// For all components
		rateThresholds: undefined,
		modelList: [], 													// For toggle switches to select models being displayed
		startDate: (new Date(0)).toISOString().substring(0,10), // For DataFiltering
		endDate: (new Date()).toISOString().substring(0,10),		// For DataFiltering
		permaLink: window.location.href
	}

  componentDidMount() {
		const fetchUrl = homeFetchUrl(this.props.location.search);
    fetch(fetchUrl).then(response => {
			if (!response.ok) { throw response };
			return response.json();
		}).then(jsondata => {
			const didMountData = homeModelData(jsondata);
			this.setState(didMountData);
		});
  }

  handleUpdateModel = (updatedata) => {
		const updatedModelData = homeScoresData(updatedata);
    this.setState({...updatedModelData});
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

	updatePermalinkStateCallback = () => {
		const permaLinkUrl = homePermalinkUrl(
			this.props.location.search,
			this.state.activeModels,
			this.state.startDate,
			this.state.endDate
		);
		this.setState({permaLink: permaLinkUrl});
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
				const newScoresData = homeScoresData(jsondata);
				this.setState(prevState => ({
					modelData: [...prevState.modelData, ...newScoresData.modelData],
					allDates: [...new Set([...prevState.allDates, ...newScoresData.allDates])],
					activeModels: [...prevState.activeModels, ...newScoresData.activeModels],
					startDate: (prevState.startDate > newScoresData.startDate) ? newScoresData.startDate : prevState.startDate,
					endDate: (prevState.endDate < newScoresData.endDate) ? newScoresData.endDate : prevState.endDate
				}), this.updatePermalinkStateCallback);
			});
		} else {
			const modelIdToFilter = parseInt(event.target.value);
			const filteredModel = this.state.modelData.slice().filter(m => m.id !== modelIdToFilter);
			const filteredDates = filteredModel.map(
				m => m.datapoints
			).reduce(
				(arr, datapoint) => [...arr, ...new Set([...datapoint.map(p => p.score_date)])], []
			);
			this.setState(prevState => ({
				modelData: filteredModel,
				allDates: filteredDates,
				activeModels: prevState.activeModels.filter(id => id !== modelIdToFilter)
			}), this.updatePermalinkStateCallback);
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
