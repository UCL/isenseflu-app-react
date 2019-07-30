import React from 'react';
import PropTypes from 'prop-types';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import ChartComponent from './Chart';
import DataFilteringComponent from './DataFiltering';
import AveragesComponent from './Averages';
import { RawScores } from './RawScores';
import { homeFetchUrl, homeFetchScoresUrl, homePermalinkUrl } from './Url';
import { homeModelData, homeScoresData } from './JsonData';

class HomeComponent extends React.Component {
  state = {
    activeModels: [],
    modelData: [], // For all components
    rateThresholds: {},
    modelList: [], // For toggle switches to select models being displayed
    startDate: (new Date(0)).toISOString().substring(0, 10), // For DataFiltering
    endDate: (new Date()).toISOString().substring(0, 10), // For DataFiltering
    resolution: 'day', // For DataFiltering
    smoothing: 0, // for DataFiltering
    permaLink: window.location.href,
    chartTitlePrefix: 'Daily',
  }

  componentDidMount() {
    const { location } = this.props;
    const fetchUrl = homeFetchUrl(location.search);
    fetch(fetchUrl).then((response) => {
      if (!response.ok) { throw response; }
      return response.json();
    }).then((jsondata) => {
      const didMountData = homeModelData(jsondata);
      this.setState(didMountData);
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
          if (!response.ok) { throw response; }
          return response.json();
        }).then((jsondata) => {
          const newScoresData = homeScoresData(jsondata);
          this.setState(prevState => ({
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
        });
    } else {
      const modelIdToFilter = parseInt(event.target.value, 10);
      const { modelData } = this.state;
      const filteredModel = modelData.slice().filter(m => m.id !== modelIdToFilter);
      const filteredDates = filteredModel.map(
        m => m.datapoints,
      ).reduce(
        (arr, datapoint) => [...arr, ...new Set([...datapoint.map(p => p.score_date)])], [],
      );
      this.setState(prevState => ({
        modelData: filteredModel,
        allDates: filteredDates,
        activeModels: prevState.activeModels.filter(id => id !== modelIdToFilter),
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

  render() {
    const {
      activeModels,
      allDates,
      chartTitlePrefix,
      endDate,
      modelData,
      modelList,
      permaLink,
      rateThresholds,
      resolution,
      smoothing,
      startDate,
    } = this.state;

    const modelToggleControls = modelList.map(model => (
      <FormGroup key={model.id}>
        <FormControlLabel
          control={(
            <Switch
              value={String(model.id)}
              checked={activeModels.includes(model.id)}
              onChange={e => this.handleChangeCallback(
                e, startDate, endDate, resolution, smoothing,
              )}
              color="primary"
            />
          )}
          label={model.name}
        />
      </FormGroup>
    ));

    return (
      <React.Fragment>
        <ChartComponent
          charttitle={`${chartTitlePrefix} influenza-like illness rates`}
          modeldata={modelData}
          modelcontrols={modelToggleControls}
          modelannotations={rateThresholds}
          permalink={permaLink}
        />
        <DataFilteringComponent
          modelIds={modelData.map(m => m.id)}
          startDate={startDate}
          endDate={endDate}
          resolution={resolution}
          smoothing={smoothing}
          updateCallback={this.handleUpdateModel}
          onChangeCallback={this.handlePropsChange}
          permalinkCallback={this.handleUpdatePermalink}
          chartTitleCallback={this.handleChartTitleUpdate}
        />
        <AveragesComponent modeldata={modelData} />
        <RawScores
          modeldata={modelData}
          allDates={allDates}
          startDate={startDate}
          endDate={endDate}
        />
      </React.Fragment>
    );
  }
}

HomeComponent.propTypes = {
  location: PropTypes.object.isRequired,
};

export default HomeComponent;
