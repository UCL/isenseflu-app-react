import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { Article, FormFooter } from './PublicTemplates';

export default class DataFilteringComponent extends Component {
  render() {
    return (
      <Article header="Data Filtering">
        <Form>
          <div className="form-row border-top border-bottom m-0 p-2">
            <FormGroup className="col-md-3">
              <Label for="start-date">Start</Label>
              <Input type="date" name="start-date" id="start-date"/>
              <small className="form-text text-muted">Only show data collected on or after this date</small>
            </FormGroup>
            <FormGroup className="col-md-3">
              <Label for="end-date">End</Label>
              <Input type="date" name="end-date" id="end-date"/>
              <small className="form-text text-muted">Only show data collected on or before this date</small>
            </FormGroup>
            <FormGroup className="col-md-3">
              <Label for="resolution">Resolution</Label>
              <Input type="select" name="resolution" id="resolution">
                <option value="day" selected>Day</option>
                <option value="week">Week</option>
              </Input>
              <small className="form-text text-muted">How many data points to show</small>
            </FormGroup>
            <FormGroup className="col-md-3">
              <Label for="smoothing">Smoothing</Label>
              <Input type="select" name="smoothing" id="smoothing">
                <option value="0" selected>No smoothing</option>
                <option value="3">3-day moving average</option>
                <option value="5">5-day moving average</option>
                <option value="7">7-day moving average</option>
              </Input>
              <small className="form-text text-muted">Smooth the data to avoid overly spiky results</small>
            </FormGroup>
          </div>
          <FormFooter>
            <Button>Show data</Button>
          </FormFooter>
        </Form>
      </Article>
    );
  }
}
