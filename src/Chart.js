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
			data: [1.65, 1.59, 1.80, 1.81, 1.56, 1.55, 2.40],
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
