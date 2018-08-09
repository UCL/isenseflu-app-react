import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { Article, FormFooter } from './PublicTemplates';

const data = {
	labels: ["January", "February", "March", "April", "May", "June", "July"],
	datasets: [
		{
			label: "My First dataset",
      fill: false,
			borderColor: "rgba(0, 123, 255, 1)",
			backgroundColor: "rgba(63, 127, 191, 0.2)",
			data: [1.65, 1.59, 1.80, 1.81, 1.56, 1.55, 2.40],
			pointStyle: 'line'
		},
		{
			label: "Upper confidence interval",
			fill: false,
			borderColor: "rgba(168, 198, 224, 1)",
			data: [1.95, 1.99, 1.90, 1.91, 1.96, 1.85, 2.60],
			pointStyle: 'line'
		},
		{
			label: "Lower confidence interval",
      fill: 1,
			borderColor: "rgba(168, 198, 224, 1)",
			backgroundColor: "rgba(63, 127, 191, 0.2)",
			data: [0.65, 0.59, 0.80, 0.81, 1.06, 1.05, 1.40],
			pointStyle: 'line'
		}
	]
};

const options = {
	legend: {
		position: "bottom",
		labels: {
			usePointStyle: true,
			fontSize: 14
		}
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
	}
};

export default class ChartComponent extends Component {

	componentDidMount() {
		fetch('http://127.0.0.1:8000/scores/1')
		.then(results => {
			if (!response.ok) { throw response };
			return results.json();
		}).then(data => {

		})
	}

  render() {
    return (
			<Article header="Influenza-Like Illness Rate per Day">
				<div className="p-4 border-top">
      		<Line data={data} options={options}/>
				</div>
				<div>
					<header className="px-2">
						<h5>Select model to display</h5>
					</header>
					<Form>
						<div className="px-4 py-2">
						<FormGroup check inline>
							<Label check>
								<Input type="checkbox" value="1" />Google
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
