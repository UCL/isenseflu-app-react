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

import React from 'react';
import PropTypes from 'prop-types';

import Snackbar from '@material-ui/core/Snackbar';

import ChartComponent from './Chart';
import DataFilteringComponent from './DataFiltering';
import AveragesComponent from './Averages';
import ModelCheckboxes from './ModelCheckboxes';
import { RawScores } from './RawScores';
import { homeFetchUrl, homeFetchScoresUrl, homePermalinkUrl } from './Url';
import { homeModelData, homeScoresData } from './JsonData';

/* eslint { react/state-in-constructor: "off" } */
class HomeComponent extends React.Component {
  state = {
    activeModels: [],
    allDates: [],
    modelData: [], // For all components
    rateThresholds: {},
    modelList: [], // For toggle switches to select models being displayed
    startDate: (new Date(0)).toISOString().substring(0, 10), // For DataFiltering
    endDate: (new Date()).toISOString().substring(0, 10), // For DataFiltering
    resolution: 'day', // For DataFiltering
    smoothing: 0, // for DataFiltering
    permaLink: window.location.href,
    chartTitlePrefix: 'Daily',
    errorMessages: [],
  }

  componentDidMount() {
    const { location } = this.props;
    const fetchUrl = homeFetchUrl(location.search);
    fetch(fetchUrl).then((response) => {
      if (!response.ok) { throw Error('Cannot fetch scores from API'); }
      return response.json();
    }).then((jsondata) => {
      const didMountData = homeModelData(jsondata);
      this.setState(didMountData);
    }).catch((error) => {
      this.setState({ errorMessages: [error.message] });
    });
  }

  handleUpdateModel = (updatedata) => {
    const updatedModelData = homeScoresData(updatedata);
    this.setState({ ...updatedModelData });
  }

  handlePropsChange = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    if (value !== undefined) {
      this.setState({
        [name]: value,
      });
    }
  }

  updatePermalinkStateCallback = () => {
    const { location } = this.props;
    const {
      activeModels, startDate, endDate, resolution, smoothing,
    } = this.state;
    const permaLinkUrl = homePermalinkUrl(
      location.search,
      activeModels,
      startDate,
      endDate,
      resolution,
      smoothing,
    );
    this.setState({ permaLink: permaLinkUrl });
  }

  handleChangeCallback = (event, startDate, endDate, resolution, smoothing) => {
    if (event.target.checked) {
      // Download data for that particular model
      const fetchUrl = homeFetchScoresUrl(
        event.target.value, startDate, endDate, resolution, smoothing,
      );
      fetch(fetchUrl)
        .then((response) => {
          if (!response.ok) {
            throw Error('Cannot reach API to fetch scores for the range required');
          }
          return response.json();
        }).then((jsondata) => {
          const newScoresData = homeScoresData(jsondata);
          this.setState((prevState) => ({
            modelData: [...prevState.modelData, ...newScoresData.modelData],
            allDates: [...new Set([...prevState.allDates, ...newScoresData.allDates])],
            activeModels: [...prevState.activeModels, ...newScoresData.activeModels],
            startDate: (prevState.startDate > newScoresData.startDate)
              ? newScoresData.startDate
              : prevState.startDate,
            endDate: (prevState.endDate < newScoresData.endDate)
              ? newScoresData.endDate
              : prevState.endDate,
          }), this.updatePermalinkStateCallback);
        }).catch((error) => {
          this.setState((prevState) => (
            { errorMessages: [...prevState.errorMessages, error.message] }
          ));
        });
    } else {
      const modelIdToFilter = parseInt(event.target.value, 10);
      const { modelData } = this.state;
      const filteredModel = modelData.slice().filter((m) => m.id !== modelIdToFilter);
      const filteredDates = filteredModel.map(
        (m) => m.datapoints,
      ).reduce(
        (arr, datapoint) => [...arr, ...new Set([...datapoint.map((p) => p.score_date)])], [],
      );
      this.setState((prevState) => ({
        modelData: filteredModel,
        allDates: filteredDates,
        activeModels: prevState.activeModels.filter((id) => id !== modelIdToFilter),
      }), this.updatePermalinkStateCallback);
    }
  };

  handleUpdatePermalink = (permalinkUrl) => {
    this.setState({ permaLink: permalinkUrl });
  };

  handleChartTitleUpdate = (value) => {
    if (value) {
      this.setState({ chartTitlePrefix: 'Weekly' });
    }
  };

  handleErrorCallback = (message) => {
    this.setState((prevState) => (
      { errorMessages: [...prevState.errorMessages, message] }
    ));
  };

  render() {
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
    } = this.state;

    return (
      <React.Fragment>
        <ChartComponent
          charttitle={`${chartTitlePrefix} influenza-like illness rates`}
          modeldata={modelData}
          modelcontrols={(
            <ModelCheckboxes
              activeIds={activeModels}
              endDate={endDate}
              handleChangeCallback={this.handleChangeCallback}
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
          updateCallback={this.handleUpdateModel}
          onChangeCallback={this.handlePropsChange}
          permalinkCallback={this.handleUpdatePermalink}
          chartTitleCallback={this.handleChartTitleUpdate}
          errorCallback={this.handleErrorCallback}
        />
        <AveragesComponent modeldata={modelData} />
        <RawScores
          modeldata={modelData}
          allDates={allDates}
          startDate={startDate}
          endDate={endDate}
          resolution={resolution}
        />
        {errorMessages.forEach((message) => (<Snackbar message={message} />))}
      </React.Fragment>
    );
  }
}

HomeComponent.propTypes = {
  /** @type {Object} Window location */
  location: PropTypes.object.isRequired,
};

export default HomeComponent;
