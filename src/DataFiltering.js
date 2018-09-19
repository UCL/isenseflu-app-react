import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { Article, FormFooter } from './PublicTemplates';

export default class DataFilteringComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: undefined,
      endDate: undefined,
      resolution: "day",
      smoothing: 0,
      isDisabled: true
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
      isDisabled: false
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const startDateParam = this.state.startDate === undefined ? this.props.startDate : this.state.startDate;
    const endDateParam = this.state.endDate === undefined ? this.props.endDate : this.state.endDate;
    const queryUrl = `${process.env.REACT_APP_API_HOST}/scores/${this.props.modelId}?start_date=${startDateParam}&end_date=${endDateParam}`;
    fetch(queryUrl)
    .then(response => {
      if (!response.ok) { throw response };
			return response.json();
    }).then(jsondata => {
      this.props.updateCallback(jsondata);
    });
  }

  render() {
    return (
      <Article header="Data Filtering">
        <Form onSubmit={this.handleSubmit}>
          <div className="form-row border-top border-bottom m-0 p-2">
            <FormGroup className="col-md-3">
              <Label for="start-date">Start</Label>
              <Input
                type="date"
                name="start-date"
                id="start-date"
                value={this.props.startDate}
                onChange={this.handleChange}
                />
              <small className="form-text text-muted">
                Only show data collected on or after this date
              </small>
            </FormGroup>
            <FormGroup className="col-md-3">
              <Label for="end-date">End</Label>
              <Input
                type="date"
                name="end-date"
                id="end-date"
                value={this.props.endDate}
                onChange={this.handleChange}
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
                value={this.state.resolution}
                onChange={this.handleChange}
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
                value={this.state.smoothing}
                onChange={this.handleChange}
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
            this.state.isDisabled
            ? <Button disabled>Show data</Button>
            : <Button>Show data</Button>
          }
          </FormFooter>
        </Form>
      </Article>
    );
  }
}
