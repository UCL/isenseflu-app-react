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
 * @param  {Number} resolution The density of the data points returned, either day or week
 * @param  {String} smoothing  Number of days to smooth data over using a moving average filter
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
