import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { Article, FormFooter } from './PublicTemplates';

const data = (modeldata) => {
	let template = {
		labels: [],
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
		points.reverse().forEach(
			datapoint => {
				const date = new Date(Date.parse(datapoint.score_date));
				template.labels.push(date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }));
				template.datasets[0].data.push(datapoint.score_value);
				template.datasets[1].data.push(datapoint.confidence_interval_upper);
				template.datasets[2].data.push(datapoint.confidence_interval_lower);
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
					}
				}
			],
			xAxes: [
				{
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
		}
	}
};

export default class ChartComponent extends Component {

  render() {
    return (
			<Article header="Influenza-Like Illness Rate per Day">
				<div className="p-4 border-top">
      		<Line data={data(this.props.modeldata)} options={options(this.props.modeldata.name)}/>
				</div>
				<div>
					<header className="px-2">
						<h5>Select model to display</h5>
					</header>
					<Form>
						<div className="px-4 py-2">
						<FormGroup check inline>
							<Label check>
								<Input type="checkbox" value="1" />{this.props.modeldata.name}
							</Label>
						</FormGroup>
						</div>
						<FormFooter>
							<Button>Update chart</Button>
						</FormFooter>
					</Form>
				</div>
			</Article>
    );
  }

}
