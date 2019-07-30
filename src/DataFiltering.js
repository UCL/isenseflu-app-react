import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
import { dataFilteringPermalinkUrl, dataFilteringQueryUrl } from './Url';

const styles = theme => ({
  filteringFields: {
    padding: theme.spacing.unit * 2,
  },
});

class DataFilteringComponent extends Component {
  state = {
    isDisabled: true,
    isWeekly: false,
  }

  handlePropsChange = (event) => {
    const { onChangeCallback } = this.props;
    onChangeCallback(event);
    this.setState({
      isDisabled: false,
    });
  }

  handleResolutionChange = (event) => {
    const { onChangeCallback } = this.props;
    onChangeCallback(event);
    this.setState({
      isWeekly: event.target.value === 'week',
      isDisabled: false,
    });
  }

  handleSubmit = (queryUrl, permalinkUrl, isWeekly) => (event) => {
    event.preventDefault();
    const { chartTitleCallback, permalinkCallback, updateCallback } = this.props;
    fetch(queryUrl)
      .then((response) => {
        if (!response.ok) { throw response; }
        return response.json();
      }).then((jsondata) => {
        updateCallback(jsondata);
        chartTitleCallback(isWeekly);
      });
    this.setState({ isDisabled: true });
    permalinkCallback(permalinkUrl);
  }

  render() {
    const {
      classes, endDate, modelIds, startDate, resolution, smoothing,
    } = this.props;

    const { isDisabled, isWeekly } = this.state;

    const queryUrl = dataFilteringQueryUrl(modelIds, startDate, endDate, resolution, smoothing);

    const permalinkUrl = dataFilteringPermalinkUrl(
      modelIds, startDate, endDate, resolution, smoothing,
    );

    return (
      <Article header="Data Filtering">
        <Grid item xs={12}>
          <form onSubmit={this.handleSubmit(queryUrl, permalinkUrl, isWeekly)}>
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
                    onChange={this.handleResolutionChange}
                    inputProps={{ name: 'resolution', id: 'resolution' }}
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
                    onChange={this.handlePropsChange}
                    inputProps={{ name: 'smoothing', id: 'smoothing' }}
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

DataFilteringComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  chartTitleCallback: PropTypes.func.isRequired,
  endDate: PropTypes.string.isRequired,
  modelIds: PropTypes.array.isRequired,
  onChangeCallback: PropTypes.func.isRequired,
  permalinkCallback: PropTypes.func.isRequired,
  resolution: PropTypes.string.isRequired,
  smoothing: PropTypes.number.isRequired,
  startDate: PropTypes.string.isRequired,
  updateCallback: PropTypes.func.isRequired,
};

export default withStyles(styles)(DataFilteringComponent);
