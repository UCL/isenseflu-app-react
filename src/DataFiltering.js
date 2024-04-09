/*
 * i-sense flu app: Frontend module of the i-sense flu application
 *
 * Copyright (c) 2019, UCL <https://www.ucl.ac.uk/>
 *
 * This file is part of i-sense flu app
 *
 * i-sense flu app is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * i-sense flu app is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with i-sense flu app.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { Article, FormFooter } from './PublicTemplates';
import { dataFilteringPermalinkUrl as dataFilteringPermalink, dataFilteringQueryUrl } from './Url';

const FilteringFields = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const DataFilteringComponent = ({
  chartTitleCallback,
  endDate,
  errorCallback,
  modelIds,
  onChangeCallback,
  permalinkCallback,
  resolution,
  smoothing,
  startDate,
  updateCallback,
}) => {
  const [isDisabled, setDisabled] = useState(true);
  const [isWeekly, setWeekly] = useState(true);

  const handlePropsChange = (event) => {
    onChangeCallback(event);
    setDisabled(true);
  };

  const handleResolutionChange = (event) => {
    onChangeCallback(event);
    setWeekly(event.target.value === 'week');
    setDisabled(false);
  };

  const handleSubmit = (queryUrl, permalinkUrl, weekly) => (event) => {
    event.preventDefault();
    const fetchData = async (url) => {
      const response = await fetch(url);
      if (!response.ok) { throw Error('DataFiltering: Cannot fetch scores from API'); }
      const jsondata = await response.json();
      updateCallback(jsondata);
      chartTitleCallback(weekly);
    };
    fetchData().catch((error) => {
      errorCallback(error.message);
    });
    setDisabled(true);
    permalinkCallback(permalinkUrl);
  };

  const queryUrl = dataFilteringQueryUrl(modelIds, startDate, endDate, resolution, smoothing);

  const permalink = dataFilteringPermalink(modelIds, startDate, endDate, resolution, smoothing);

  return (
    <Article header="Data Filtering">
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(queryUrl, permalink, isWeekly)}>
          <FilteringFields container spacing={2}>
            <Grid item xs={3}>
              <FormGroup>
                <InputLabel htmlFor="start-date">Start</InputLabel>
                <Input
                  type="date"
                  name="startDate"
                  id="start-date"
                  value={startDate}
                  onChange={handlePropsChange}
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
                  onChange={handlePropsChange}
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
                  onChange={handleResolutionChange}
                  inputProps={{ name: 'resolution', id: 'resolution' }}
                  variant="standard"
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
                  onChange={handlePropsChange}
                  inputProps={{ name: 'smoothing', id: 'smoothing' }}
                  variant="standard"
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
          </FilteringFields>
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
};

DataFilteringComponent.propTypes = {
  /** @type {function(value: boolean)} Callback function to update the title of the chart based on
  the resolution of the data */
  chartTitleCallback: PropTypes.func.isRequired,

  /** @type {string} End date of requested time period, inclusive. In the format YYYY-MM-DD */
  endDate: PropTypes.string.isRequired,

  /** @type {function(message: string)} Callback function to pass error messages from fetch */
  errorCallback: PropTypes.func.isRequired,

  /** @type {number[]} Array containing the ids of the models being displayed */
  modelIds: PropTypes.arrayOf(PropTypes.number).isRequired,

  /** @type {function(event: Object)} Callback function used to pass the values of each field target
   to the parent */
  onChangeCallback: PropTypes.func.isRequired,

  /** @type {function(permalink: string)} Callback function to update the query parameters in the
   permalink URL */
  permalinkCallback: PropTypes.func.isRequired,

  /** @type {string} The density of the data points returned, either day or week */
  resolution: PropTypes.string.isRequired,

  /** @type {number} Number of days to smooth data over using a moving average filter */
  smoothing: PropTypes.number.isRequired,

  /** @type {string} Start date of requested time period, inclusive. In the format YYYY-MM-DD */
  startDate: PropTypes.string.isRequired,

  /** @type {function(updatedata: Object[])} Callback function to update the scores with the values
   queried with the form */
  updateCallback: PropTypes.func.isRequired,
};

export { DataFilteringComponent as default };
