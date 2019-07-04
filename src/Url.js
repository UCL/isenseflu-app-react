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
    let searchParams = new URLSearchParams(locationSearch);
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
 * @param  {Number} id        The id of the model to retrieve the scores for
 * @param  {String} startDate Start date of requested time period. In ISO format YYYY-MM-DD
 * @param  {String} endDate   End date of requested time period. In ISO format YYYY-MM-DD
 * @return {String}           The URL to call the API
 */
export const homeFetchScoresUrl = (id, startDate, endDate) => {
  let fetchUrl = process.env.REACT_APP_API_HOST;
  fetchUrl += fetchUrl.endsWith('/') ? '' : '/';
  return `${fetchUrl}scores?id=${id}&startDate=${startDate}&endDate=${endDate}`;
};

/**
 * Updates the URL used to set the permaLink state variable in the Home component as done by the
 * callback function handleChangeCallback() which is called by the modelcontrols prop in the Chart
 * component.
 * @param  {String} locationSearch String containing the value of location.search in the component
 * @param  {Array}  id             Array containing the ids of the models to be present in the URL
 * @return {String}                The URL to be used in the permaLink
 */
export const homePermalinkInChangeCallback = (locationSearch, ids) => {
  let searchParams = new URLSearchParams(locationSearch);
  searchParams.set('source', 'plink');
  searchParams.delete('id');
  ids.forEach(id => {
    searchParams.append('id', id);
  });
  return `${window.location.toString()}?${searchParams.toString()}`;
};
