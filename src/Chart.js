import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { Article, FormFooter } from './PublicTemplates';

let data = {
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
};

let options = {
	legend: {
		display: false
	},
	title: {
		display: true,
		text: "Model: ",
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
};

export default class ChartComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {chartdata: data};
	}

	componentDidMount() {
		fetch('http://fmdetect.cs.ucl.ac.uk/')
		.then(response => {
			if (!response.ok) { throw response };
			return response.json();
		}).then(jsondata => {
			data.labels = [];
			data.datasets.forEach(
				dataset => {
					dataset.data = []
				}
			);
			options.title.text += jsondata.name;
			jsondata.datapoints.forEach(
				datapoint => {
					const date = new Date(Date.parse(datapoint.score_date));
					data.labels.push(date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }));
					data.datasets[0].data.push(datapoint.score_value);
					data.datasets[1].data.push(datapoint.confidence_interval_upper);
					data.datasets[2].data.push(datapoint.confidence_interval_lower);
				}
			);
			data.datasets[0].label = jsondata.name;
			this.setState({chartdata: data});
		})
	}

  render() {
    return (
			<Article header="Influenza-Like Illness Rate per Day">
				<div className="p-4 border-top">
      		<Line data={this.state.chartdata} options={options}/>
				</div>
				<div>
					<header className="px-2">
						<h5>Select model to display</h5>
					</header>
					<Form>
						<div className="px-4 py-2">
						<FormGroup check inline>
							<Label check>
								<Input type="checkbox" value="1" />{this.state.chartdata.datasets[0].label}
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
