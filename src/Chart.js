import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Button, Form } from 'reactstrap';
import 'chartjs-plugin-annotation';

import { Article, FormFooter } from './PublicTemplates';
import ModelCheckboxesComponent from './ModelCheckboxes';

const data = (modeldata) => {
	let template = {
		datasets: [
			{
				label: "Model Scorea",
				fill: false,
				borderColor: "rgba(0, 123, 255, 1)",
				backgroundColor: "rgba(63, 127, 191, 0.2)",
				data: [],
				pointStyle: 'line'
			},
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
		]
	}
	if (modeldata.datapoints !== undefined) {
		let points = modeldata.datapoints.slice();
		points.forEach(
			datapoint => {
				const date = new Date(Date.parse(datapoint.score_date));
				const dateStr = date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
				template.datasets[0].data.push({t: dateStr, y: datapoint.score_value});
				template.datasets[1].data.push({t: dateStr, y: datapoint.confidence_interval_upper});
				template.datasets[2].data.push({t: dateStr, y: datapoint.confidence_interval_lower});
			}
		);
		template.datasets[0].label = modeldata.name;
	}
	return template;
};

const options = (modelname) => {
	return {
		legend: {
			display: false
		},
		title: {
			display: true,
			text: "Model: " + modelname,
			fontSize: 16,
			fontStyle: 'normal'
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
			drawTime: 'beforeDatasetsDraw',
			annotations: [
				{
					type: 'line',
					mode: 'horizontal',
					scaleID: 'y-axis-0',
					value: 13.1,
					borderColor: 'red',
					borderWidth: 2,
					label: {
						backgroundColor: 'rgba(0,0,0,0.05)',
						fontColor: '#666',
						position: 'left',
						yAdjust: -10,
						enabled: true,
						content: 'Low epidemic rate'
					}
				}
			]
		}
	}
};

export default class ChartComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			modellist: []
		};
	}

	componentDidMount() {
		fetch(process.env.REACT_APP_API_HOST + '/models')
		.then(response => {
			if (!response.ok) { throw response };
			return response.json();
		}).then(jsondata => {
			this.setState({modellist: jsondata});
		})
	}


  render() {
		const georegion = this.props.modeldata.parameters.georegion === 'e' ? ' (England)' : '';
		const modelname = `${this.props.modeldata.name}${georegion}`
    return (
			<Article header="Influenza-like illness rate per day">
				<div className="p-4 border-top">
      		<Line data={data(this.props.modeldata)} options={options(modelname)}/>
				</div>
				<div>
					<header className="px-2">
						<h5>Select model to display</h5>
					</header>
					<Form>
						<ModelCheckboxesComponent
							modellist={this.state.modellist}
							flagid={this.props.modeldata.id} />
						<FormFooter>
							<Button disabled>Update chart</Button>
						</FormFooter>
					</Form>
				</div>
			</Article>
    );
  }

}
