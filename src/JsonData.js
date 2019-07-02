/**
 * Converts a JSON response from the root, plink or twlink patha of the API into an object with
 * state variables for the Home component
 * @param  {Object} jsondata JSON response containing the model list, rate thresholds and model data
 * @return {Object}          Object containing state variables for Home component
 */
export const homeModelData = (jsondata) => {
  const datesList = [];
  const activeModels = [];
  const modelData = [];
  jsondata.model_data.forEach(item => {
    datesList.push(item.data_points.map(p => p.score_date));
    activeModels.push(item.id);
    modelData.push(
      {
        id: item.id,
        name: item.name,
        hasConfidenceInterval: item.has_confidence_interval,
        averageScore: item.average_score,
        datapoints: item.data_points
      }
    );
  });
  const startDate = new Date(Math.min.apply(null, datesList.flat().map(e => { return new Date(e) })));
  const endDate = new Date(Math.max.apply(null, datesList.flat().map(e => { return new Date(e) })));

  return {
    modelData: modelData,
    startDate: startDate.toISOString().substring(0,10),
    endDate: endDate.toISOString().substring(0,10),
    modelList: jsondata.model_list,
    activeModels: activeModels,
    rateThresholds: jsondata.rate_thresholds,
    allDates: [...new Set(datesList.flat())]
  };
};

/**
 * Converts a JSON response from the scores path of the API into an object with state variables for
 * the Home component
 * @param  {Object} jsondata JSON response containing the model data
 * @return {Object}          Object containing state variables for Home component
 */
export const homeScoresData = (jsondata) => {
  return {
    id: jsondata[0].id,
    name: jsondata[0].name,
    datapoints: jsondata[0].data_points,
    hasConfidenceInterval: jsondata[0].has_confidence_interval,
    startDate: jsondata[0].start_date,
    endDate: jsondata[0].end_date,
    modelDates: jsondata[0].data_points.slice().map(p => {return p.score_date})
  }
};
