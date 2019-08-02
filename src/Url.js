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

/**
 * Builds the URL used to fetch data for the Home component on componentDidMount(). Depending on
 * the value of the parameter 'source' it will map to the either /plink or /twlink paths.
 * @param  {String} locationSearch String containing the value of location.search in the component
 * @return {String}                The URL to call the API
 */
export const homeFetchUrl = (locationSearch) => {
  let fetchUrl = process.env.REACT_APP_API_HOST;
  fetchUrl += fetchUrl.endsWith('/') ? '' : '/';
  if (locationSearch) {
    const searchParams = new URLSearchParams(locationSearch);
    if (searchParams.get('source') === 'plink') {
      searchParams.delete('source');
      fetchUrl = `${fetchUrl}plink?${searchParams.toString()}`;
    }
    if (searchParams.get('source') === 'twlink') {
      searchParams.delete('source');
      fetchUrl = `${fetchUrl}twlink?${searchParams.toString()}`;
    }
  }
  return fetchUrl;
};

/**
 * Builds the URL used to fetch the model scores for the Home component on the callback function
 * handleChangeCallback() called by the modelcontrols prop in the Chart component.
 * @param  {Number} id         The id of the model to retrieve the scores for
 * @param  {String} startDate  Start date of requested time period. In ISO format YYYY-MM-DD
 * @param  {String} endDate    End date of requested time period. In ISO format YYYY-MM-DD
 * @param  {Number} resolution The density of the data points returned, either day or week
 * @param  {String} smoothing  Number of days to smooth data over using a moving average filter
 * @return {String}            The URL to call the API
 */
export const homeFetchScoresUrl = (id, startDate, endDate, resolution, smoothing) => {
  let fetchUrl = process.env.REACT_APP_API_HOST;
  fetchUrl += fetchUrl.endsWith('/') ? '' : '/';
  const searchParams = new URLSearchParams();
  searchParams.set('id', id);
  searchParams.set('startDate', startDate);
  searchParams.set('endDate', endDate);
  searchParams.set('resolution', resolution);
  searchParams.set('smoothing', smoothing);
  return `${fetchUrl}scores?${searchParams.toString()}`;
};

/**
 * Updates the URL used to set the permaLink state variable in the Home component as done by the
 * callback function handleChangeCallback() which is called by the modelcontrols prop in the Chart
 * component.
 * @param  {String} locationSearch String containing the value of location.search in the component
 * @param  {Array}  id             Array containing the ids of the models to be present in the URL
 * @param  {String} startDate      Start date of requested time period. In ISO format YYYY-MM-DD
 * @param  {String} endDate        End date of requested time period. In ISO format YYYY-MM-DD
 * @param  {Number} resolution     The density of the data points returned, either day or week
 * @param  {String} smoothing      Number of days to smooth data over using a moving average filter
 * @return {String}                The URL to be used in the permaLink
 */
export const homePermalinkUrl = (
  locationSearch, ids, startDate, endDate, resolution, smoothing,
) => {
  const searchParams = new URLSearchParams(locationSearch);
  searchParams.set('source', 'plink');
  searchParams.delete('id');
  ids.forEach((id) => {
    searchParams.append('id', id);
  });
  searchParams.set('startDate', startDate);
  searchParams.set('endDate', endDate);
  searchParams.set('resolution', resolution);
  searchParams.set('smoothing', smoothing);
  const pUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
  return `${pUrl}?${searchParams.toString()}`;
};

/**
 * Generates the permalink URL based on the parameters configured in the DataFiltering component.
 * @param  {Array} ids         Array containing the ids of the models to be present in the URL
 * @param  {String} startDate  Start date of requested time period. In ISO format YYYY-MM-DD
 * @param  {String} endDate    End date of requested time period. In ISO format YYYY-MM-DD
 * @param  {String} resolution The density of the data points returned, either day or week
 * @param  {Number} smoothing  Number of days to smooth data over using a moving average filter
 * @return {String}            The URL to be used in the permaLink
 */
export const dataFilteringPermalinkUrl = (ids, startDate, endDate, resolution, smoothing) => {
  const searchParams = new URLSearchParams();
  searchParams.set('source', 'plink');
  ids.forEach((id) => {
    searchParams.append('id', id);
  });
  searchParams.set('startDate', startDate);
  searchParams.set('endDate', endDate);
  searchParams.set('resolution', resolution);
  searchParams.set('smoothing', smoothing);
  const pUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
  return `${pUrl}?${searchParams.toString()}`;
};

/**
 * Generates the URL used to fetch the scores based on the parameters configured in the
 * DataFiltering component.
 * @param  {Array} ids         Array containing the ids of the models to be present in the URL
 * @param  {String} startDate  Start date of requested time period. In ISO format YYYY-MM-DD
 * @param  {String} endDate    End date of requested time period. In ISO format YYYY-MM-DD
 * @param  {String} resolution The density of the data points returned, either day or week
 * @param  {Number} smoothing  Number of days to smooth data over using a moving average filter
 * @return {String}            The URL to be used in the permaLink
 */
export const dataFilteringQueryUrl = (ids, startDate, endDate, resolution, smoothing) => {
  let fetchUrl = process.env.REACT_APP_API_HOST;
  fetchUrl += fetchUrl.endsWith('/') ? '' : '/';
  const searchParams = new URLSearchParams();
  ids.forEach((id) => {
    searchParams.append('id', id);
  });
  searchParams.set('startDate', startDate);
  searchParams.set('endDate', endDate);
  searchParams.set('resolution', resolution);
  searchParams.set('smoothing', smoothing);
  const endpointUrl = `${fetchUrl}scores`;
  return `${endpointUrl}?${searchParams.toString()}`;
};
