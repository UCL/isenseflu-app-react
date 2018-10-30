import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { Article, FormFooter } from './PublicTemplates';

export const generateQueryUrl = (params) => {
	const endpointUrl = `${params.apiHost}/scores/${params.modelId}`;
	const dateParam = `startDate=${params.startDate}&endDate=${params.endDate}`;
	const resParam = `&resolution=${params.resolution}`;
	const smoothParam = `&smoothing=${params.smoothing}`;
	return `${endpointUrl}?${dateParam}${resParam}${smoothParam}`;
}

export default class DataFilteringComponent extends Component {

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

		const { endDate, startDate } = this.props;

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
        <Form onSubmit={this.handleSubmit(queryUrl)}>
          <div className="form-row border-top border-bottom m-0 p-2">
            <FormGroup className="col-md-3">
              <Label for="start-date">Start</Label>
              <Input
                type="date"
                name="startDate"
                id="start-date"
                value={startDate}
                onChange={this.handlePropsChange}
                />
              <small className="form-text text-muted">
                Only show data collected on or after this date
              </small>
            </FormGroup>
            <FormGroup className="col-md-3">
              <Label for="end-date">End</Label>
              <Input
                type="date"
                name="endDate"
                id="end-date"
                value={endDate}
                onChange={this.handlePropsChange}
                />
              <small className="form-text text-muted">
                Only show data collected on or before this date
              </small>
            </FormGroup>
            <FormGroup className="col-md-3">
              <Label for="resolution">Resolution</Label>
              <Input
                type="select"
                name="resolution"
                id="resolution"
                value={resolution}
                onChange={this.handleLocalChange}
                >
                <option value="day">Day</option>
                <option value="week">Week</option>
              </Input>
              <small className="form-text text-muted">
                How many data points to show
              </small>
            </FormGroup>
            <FormGroup className="col-md-3">
              <Label for="smoothing">Smoothing</Label>
              <Input
                type="select"
                name="smoothing"
                id="smoothing"
                value={smoothing}
                onChange={this.handleLocalChange}
                >
                <option value="0">No smoothing</option>
                <option value="3">3-day moving average</option>
                <option value="5">5-day moving average</option>
                <option value="7">7-day moving average</option>
              </Input>
              <small className="form-text text-muted">
                Smooth the data to avoid overly spiky results
              </small>
            </FormGroup>
          </div>
          <FormFooter>
          {
            isDisabled
            ? <Button disabled>Show data</Button>
            : <Button>Show data</Button>
          }
          </FormFooter>
        </Form>
      </Article>
    );
  }
}
