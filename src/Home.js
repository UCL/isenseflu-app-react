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
			const allDates = jsondata.datapoints.slice().map(p => {return p.score_date});
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
    this.setState({
      [name]: value
    });
	}

	handleChangeCallback = event => {
		if (event.target.checked) {
			// Download data for that particular model
			fetch(process.env.REACT_APP_API_HOST + `/scores?id=${event.target.value}`)
			.then(response => {
				if (!response.ok) { throw response };
				return response.json();
			}).then(jsondata => {
				const addModel = {
					id: jsondata.modeldata[0].id,
					name: jsondata.modeldata[0].label,
					datapoints: jsondata.modeldata[0].datapoints,
				}
				this.setState({
					modeldata: [...this.state.modeldata, addModel]
				});
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
			const filteredmodel = this.state.modeldata.slice().filter(
				item => { return item.id !== parseInt(event.target.value) }
			);
			this.setState({
				modeldata: filteredmodel
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
					modelIds={modeldata.map(m => m.id)}
					startDate={startDate}
					endDate={endDate}
					updateCallback={this.handleUpdateModel}
					onChangeCallback={this.handlePropsChange}
					/>
				<AveragesComponent modeldata={modeldata}/>
				<RawScores modeldata={modeldata} allDates={allDates}/>
			</React.Fragment>
    );
  }

}
