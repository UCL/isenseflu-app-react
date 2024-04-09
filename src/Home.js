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

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Snackbar from '@mui/material/Snackbar';

import ChartComponent from './Chart';
import DataFilteringComponent from './DataFiltering';
import AveragesComponent from './Averages';
import ModelCheckboxes from './ModelCheckboxes';
import { RawScores } from './RawScores';
import { homeFetchUrl, homeFetchScoresUrl, homePermalinkUrl } from './Url';
import { homeModelData, homeScoresData } from './JsonData';

// State defaults
const initialState = {
  activeModels: [],
  allDates: [],
  modelData: [], // For all components
  rateThresholds: {},
  modelList: [], // For toggle switches to select models being displayed
  startDate: (new Date(0)).toISOString().substring(0, 10), // For DataFiltering
  endDate: (new Date()).toISOString().substring(0, 10), // For DataFiltering
  resolution: 'day', // For DataFiltering
  smoothing: 3, // for DataFiltering
  permaLink: window.location.href,
  chartTitlePrefix: 'Daily',
  errorMessages: [],
};

const HomeComponent = ({ location }) => {
  const [state, setState] = useState(initialState);

  // Fetch data from API
  useEffect(() => {
    let shouldUpdate = true;
    const fetchUrl = homeFetchUrl(location.search);
    const fetchData = async () => {
      const response = await fetch(fetchUrl);
      const jsondata = await response.json();
      const fetchedState = homeModelData(jsondata);
      if (shouldUpdate) {
        setState({
          ...state,
          ...fetchedState,
        });
      }
    };
    fetchData().catch((error) => {
      setState({
        ...state,
        errorMessages: [error.message],
      });
    });
    /* eslint no-return-assign: "off" */
    return () => shouldUpdate = false;
  }, [location]);

  const handleUpdateModel = (updatedata) => {
    const updatedModelData = homeScoresData(updatedata);
    setState({
      ...state,
      ...updatedModelData,
    });
  };

  const handlePropsChange = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    if (value !== undefined) {
      setState({
        ...state,
        [name]: value,
      });
    }
  };

  const updatePermalinkStateCallback = () => {
    const {
      activeModels, startDate, endDate, resolution, smoothing,
    } = state;
    const permaLinkUrl = homePermalinkUrl(
      location.search,
      activeModels,
      startDate,
      endDate,
      resolution,
      smoothing,
    );
    setState({
      ...state,
      permaLink: permaLinkUrl,
    });
  };

  const handleChangeCallback = (event, startDate, endDate, resolution, smoothing) => {
    if (event.target.checked) {
      // Download data for that particular model
      /* eslint function-paren-newline: "off" */
      const fetchUrl = homeFetchScoresUrl(
        event.target.value, startDate, endDate, resolution, smoothing,
      );
      const fetchData = async () => {
        const response = await fetch(fetchUrl);
        if (!response.ok) {
          throw Error('Cannot reach API to fetch scores for the range required');
        }
        const jsondata = await response.json();
        const newScoresData = homeScoresData(jsondata);
        setState((prevState) => ({
          ...prevState,
          modelData: [...prevState.modelData, ...newScoresData.modelData],
          allDates: [...new Set([...prevState.allDates, ...newScoresData.allDates])],
          activeModels: [...prevState.activeModels, ...newScoresData.activeModels],
          startDate: (prevState.startDate > newScoresData.startDate)
            ? newScoresData.startDate
            : prevState.startDate,
          endDate: (prevState.endDate < newScoresData.endDate)
            ? newScoresData.endDate
            : prevState.endDate,
        }));
        updatePermalinkStateCallback();
      };
      fetchData().catch((error) => {
        setState((prevState) => ({
          ...prevState,
          errorMessages: [...prevState.errorMessages, error.message],
        }));
      });
    } else {
      const modelIdToFilter = parseInt(event.target.value, 10);
      const { modelData } = state;
      const filteredModel = modelData.slice().filter((m) => m.id !== modelIdToFilter);
      const filteredDates = filteredModel.map(
        (m) => m.datapoints,
      ).reduce(
        (arr, datapoint) => [...arr, ...new Set([...datapoint.map((p) => p.score_date)])], [],
      );
      setState((prevState) => ({
        ...prevState,
        modelData: filteredModel,
        allDates: filteredDates,
        activeModels: prevState.activeModels.filter((id) => id !== modelIdToFilter),
      }));
      updatePermalinkStateCallback();
    }
  };

  const handleUpdatePermalink = (permalinkUrl) => {
    setState({ ...state, permaLink: permalinkUrl });
  };

  const handleChartTitleUpdate = (value) => {
    if (value) {
      setState({ ...state, chartTitlePrefix: 'Weekly' });
    }
  };

  const handleErrorCallback = (message) => {
    setState((prevState) => ({
      ...prevState,
      errorMessages: [...prevState.errorMessages, message],
    }));
  };

  const {
    activeModels,
    allDates,
    chartTitlePrefix,
    endDate,
    errorMessages,
    modelData,
    modelList,
    permaLink,
    rateThresholds,
    resolution,
    smoothing,
    startDate,
  } = state;

  return (
    <React.Fragment>
      <ChartComponent
        charttitle={`${chartTitlePrefix} influenza-like illness rates`}
        modeldata={modelData}
        modelcontrols={(
          <ModelCheckboxes
            activeIds={activeModels}
            endDate={endDate}
            handleChangeCallback={handleChangeCallback}
            modellist={modelList}
            resolution={resolution}
            smoothing={smoothing}
            startDate={startDate}
          />
        )}
        ratethresholds={rateThresholds}
        permalink={permaLink}
      />
      <DataFilteringComponent
        modelIds={modelData.map((m) => m.id)}
        startDate={startDate}
        endDate={endDate}
        resolution={resolution}
        smoothing={smoothing}
        updateCallback={handleUpdateModel}
        onChangeCallback={handlePropsChange}
        permalinkCallback={handleUpdatePermalink}
        chartTitleCallback={handleChartTitleUpdate}
        errorCallback={handleErrorCallback}
      />
      <AveragesComponent modeldata={modelData} />
      <RawScores
        modeldata={modelData}
        allDates={allDates}
        startDate={startDate}
        endDate={endDate}
        resolution={resolution}
      />
      {(errorMessages !== undefined)
        ? errorMessages.forEach((message) => (<Snackbar message={message} />))
        : <span />}
    </React.Fragment>
  );
};

HomeComponent.propTypes = {
  /** @type {Object} Window location */
  location: PropTypes.object.isRequired,
};

export { HomeComponent as default };
