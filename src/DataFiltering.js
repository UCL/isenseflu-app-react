import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import { Article, FormFooter } from './PublicTemplates';

const styles = theme => ({
	filteringFields: {
		padding: theme.spacing.unit * 2,
	}
});

export const generateQueryUrl = (params) => {
	const models = params.modelIds.map(m => `id=${m}`).join('&');
	const endpointUrl = `${params.apiHost}/scores?`;
	const dateParam = `startDate=${params.startDate}&endDate=${params.endDate}`;
	const resParam = `&resolution=${params.resolution}`;
	const smoothParam = `&smoothing=${params.smoothing}`;
	return `${endpointUrl}${models}&${dateParam}${resParam}${smoothParam}`;
}

class DataFilteringComponent extends Component {

	state = {
		resolution: "day",
		smoothing: 0,
		isDisabled: true
	}

  handlePropsChange = (event) => {
    this.props.onChangeCallback(event);
    this.setState({
      isDisabled: false
    });
  }

  handleLocalChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
      isDisabled: false
    });
  }

  handleSubmit = (queryUrl) => (event) => {
    event.preventDefault();
    fetch(queryUrl)
    .then(response => {
      if (!response.ok) { throw response };
			return response.json();
    }).then(jsondata => {
      this.props.updateCallback(jsondata);
    });
    this.setState({isDisabled: true});
  }

  render() {

		const { classes, endDate, startDate } = this.props;

		const { isDisabled, resolution, smoothing } = this.state;

		const queryUrlParams = {
			...this.props,
			resolution,
			smoothing,
			apiHost: process.env.REACT_APP_API_HOST
		}

		const queryUrl = generateQueryUrl(queryUrlParams);

		return (
			<Article header="Data Filtering">
				<Grid item xs={12}>
					<form onSubmit={this.handleSubmit(queryUrl)}>
						<Grid container spacing={24} className={classes.filteringFields}>
							<Grid item xs={3}>
								<FormGroup>
									<InputLabel htmlFor="start-date">Start</InputLabel>
									<Input
										type="date"
										name="startDate"
										id="start-date"
										value={startDate}
										onChange={this.handlePropsChange}
										/>
									<Typography variant="caption">
										Only show data collected on or after this date
									</Typography>
								</FormGroup>
							</Grid>
							<Grid item xs={3}>
								<FormGroup>
									<InputLabel htmlFor="end-date">End</InputLabel>
									<Input
										type="date"
										name="endDate"
										id="end-date"
										value={endDate}
										onChange={this.handlePropsChange}
										/>
									<Typography variant="caption">
										Only show data collected on or before this date
									</Typography>
								</FormGroup>
							</Grid>
							<Grid item xs={3}>
								<FormGroup>
									<InputLabel htmlFor="resolution">Resolution</InputLabel>
									<Select
										value={resolution}
										onChange={this.handleLocalChange}
										inputProps={{name: "resolution", id: "resolution"}}
										>
										<MenuItem value="day">Day</MenuItem>
										<MenuItem value="week">Week</MenuItem>
									</Select>
									<Typography variant="caption">
										How many data points to show
									</Typography>
								</FormGroup>
							</Grid>
							<Grid item xs={3}>
								<FormGroup>
									<InputLabel htmlFor="smoothing">Smoothing</InputLabel>
									<Select
										value={smoothing}
										onChange={this.handleLocalChange}
										inputProps={{name: "smoothing", id: "smoothing"}}
										>
										<MenuItem value={0}>No smoothing</MenuItem>
										<MenuItem value={3}>3-day moving average</MenuItem>
										<MenuItem value={5}>5-day moving average</MenuItem>
										<MenuItem value={7}>7-day moving average</MenuItem>
									</Select>
									<Typography variant="caption">
										Smooth the data to avoid overly spiky results
									</Typography>
								</FormGroup>
							</Grid>
						</Grid>
						<FormFooter>
							{
								isDisabled
								? <Button type="submit" variant="contained" disabled>Show data</Button>
								: <Button type="submit" variant="contained">Show data</Button>
						}
					</FormFooter>
				</form>
			</Grid>
		</Article>
	);
  }
}

export default withStyles(styles)(DataFilteringComponent);
