import React from 'react';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';

import { Article } from './PublicTemplates';

const styles = theme => ({
	lineChart: {
		padding: theme.spacing.unit * 2,
	},
	selectModel: {
		paddingLeft: theme.spacing.unit * 2,
		paddingRight: theme.spacing.unit * 2,
	},
	permalink: {
		textAlign: 'center'
	}
});

const createColour = index => {
	const hexColours = ['#007bff', '#d100c7', '#ff008b', '#ff0055', '#ff6d28', '#ffa600'];
	if (index < hexColours.length) {
		return hexColours[index];
	} else {
		return `#${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, 0)}`;
	}
}

const data = (modeldata) => {

	if (modeldata.length === 0) {
		return {};
	}

	if (modeldata.length === 1) {
		let template = {
			datasets: [
				{
					label: "Model Scores",
					fill: false,
					borderColor: "rgba(0, 123, 255, 1)",
					backgroundColor: "rgba(63, 127, 191, 0.2)",
					data: [],
					pointStyle: 'line'
				}
			]
		}
		if (modeldata[0].hasConfidenceInterval) {
			template.datasets.push(
				{
					label: "Upper confidence interval",
					fill: false,
					borderColor: "rgba(168, 198, 224, 1)",
					data: [],
					pointStyle: 'line'
				},
				{
					label: "Lower confidence interval",
					fill: 1,
					borderColor: "rgba(168, 198, 224, 1)",
					backgroundColor: "rgba(63, 127, 191, 0.2)",
					data: [],
					pointStyle: 'line'
				}
			);
		}
		modeldata[0].datapoints.slice().forEach(datapoint => {
			const date = new Date(Date.parse(datapoint.score_date));
			template.datasets[0].data.push({t: date, y: datapoint.score_value});
			if (modeldata[0].hasConfidenceInterval) {
				template.datasets[1].data.push({t: date, y: datapoint.confidence_interval_upper});
				template.datasets[2].data.push({t: date, y: datapoint.confidence_interval_lower});
			}
		});
		template.datasets[0].label = modeldata[0].name;
		return template;
	}

	if (modeldata.length > 1) {

		let template = {
			datasets: []
		}
		modeldata.forEach(model => {
			let modelTemplate = {
				label: model.name,
				fill: false,
				borderColor: createColour(model.id - 1),
				data: [],
				pointStyle: 'line'
			}
			model.datapoints.slice().forEach(datapoint => {
				const date = new Date(Date.parse(datapoint.score_date));
				modelTemplate.data.push({t: date, y: datapoint.score_value});
			});
			template.datasets.push(modelTemplate);
		});
		return template;
	}

	return {};
};

const options = (annotationArr) => {
	return {
		legend: {
			display: true,
			position: 'bottom',
			labels: {
				fontSize: 14,
				usePointStyle: true
			}
		},
		title: {
			display: false
		},
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true,
						fontSize: 14
					},
					scaleLabel: {
						display: true,
						labelString: 'Influenza-like illness rate per 100,000 people',
						fontSize: 16
					}
				}
			],
			xAxes: [
				{
					type: 'time',
					time: {
						displayFormats: {
							day: 'D MMM'
						}
					},
					ticks: {
						fontSize: 14
					}
				}
			]
		},
		tooltips: {
			backgroundColor: 'rgba(255,255,255,0.8)',
			bodyFontColor: '#666',
			bodyFontStyle: 'bold',
			titleFontColor: '#666'
		},
		annotation: {
			drawTime: 'afterDatasetsDraw',
			annotations: annotationArr
		}
	}
};

export const generateAnnotations = (thresholddata, maxvalue) => {
	if (thresholddata === undefined) {
		return [];
	}
	const thresholdColours = {
	  low_value: 'green',
		medium_value: 'yellow',
	  high_value: 'orange',
		very_high_value: 'red'
	};
	let annotations = [];
	for (let entry of Object.entries(thresholddata)) {
		if (entry[1].value <= maxvalue) {
			annotations.push(
				{
					type: 'line',
					mode: 'horizontal',
					scaleID: 'y-axis-0',
					value: entry[1].value,
					borderColor: thresholdColours[entry[0]],
					borderWidth: 2,
					label: {
						backgroundColor: 'rgba(0,0,0,0.05)',
						fontColor: '#666',
						position: 'left',
						yAdjust: -10,
						enabled: true,
						content: entry[1].label
					}
				}
			);
		}
	}
	return annotations;
}

export const formatModelname = (modelname, georegion) => {
	const geoCountry = georegion === 'e' ? ' (England)' : '';
	return `${modelname}${geoCountry}`;
}

export const getMaxScoreValue = (modeldata) => {
	if (modeldata === undefined) {
		return -Infinity;
	}
	const res = modeldata.map(
		(m) => {
			return {
				datapoints: m.datapoints,
				hasConfidenceInterval: (modeldata.length === 1) ? m.hasConfidenceInterval : false
			}
		}
	).flatMap(
		m => {
			return (m.hasConfidenceInterval)
			? [...m.datapoints.map(d => d.confidence_interval_upper)]
			: [...m.datapoints.map(d => d.score_value)]
		}
	);
	return Math.max(...res);
}

class ChartComponent extends React.Component {

  render() {

		const {
			classes,
			modelannotations,
			modeldata,
			permalink
		} = this.props;

		const maxscorevalue = getMaxScoreValue(modeldata);
		const annotations = generateAnnotations(modelannotations, maxscorevalue);

		return (
			<Article header="Influenza-like illness rate per day">
				<Grid item xs={12} className={classes.lineChart}>
					<Line data={data(modeldata)} options={options(annotations)}/>
				</Grid>
				<Grid item xs={11} className={classes.selectModel}>
					<Typography variant="h6">
						Select model to display
					</Typography>
					{this.props.modelcontrols}
				</Grid>
				<Grid item xs={1} className={classes.permalink}>
					<IconButton href={permalink}>
						<FontAwesomeIcon icon={faLink}/>
					</IconButton>
				</Grid>
			</Article>
    );
  }

}

export default withStyles(styles)(ChartComponent);
