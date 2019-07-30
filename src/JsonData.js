const processModelData = (modelDataJson) => {
  const datesList = [];
  const activeModels = [];
  const modelData = [];
  modelDataJson.forEach((item) => {
    datesList.push(item.data_points.map(p => p.score_date));
    activeModels.push(item.id);
    modelData.push(
      {
        id: item.id,
        name: item.name,
        hasConfidenceInterval: item.has_confidence_interval,
        averageScore: item.average_score,
        datapoints: item.data_points,
      },
    );
  });
  const startDate = new Date(Math.min.apply(null, datesList.flat().map(e => new Date(e))));
  const endDate = new Date(Math.max.apply(null, datesList.flat().map(e => new Date(e))));
  return {
    modelData,
    startDate: startDate.toISOString().substring(0, 10),
    endDate: endDate.toISOString().substring(0, 10),
    activeModels,
    allDates: [...new Set(datesList.flat())],
  };
};

/**
 * Converts a JSON response from the root, plink or twlink patha of the API into an object with
 * state variables for the Home component
 * @param  {Object} jsondata JSON response containing the model list, rate thresholds and model data
 * @return {Object}          Object containing state variables for Home component
 */
export const homeModelData = jsondata => (
  {
    ...processModelData(jsondata.model_data),
    modelList: jsondata.model_list,
    rateThresholds: jsondata.rate_thresholds,
  }
);

/**
 * Converts a JSON response from the scores path of the API into an object with state variables for
 * the Home component
 * @param  {Object} jsondata JSON response containing the model data
 * @return {Object}          Object containing state variables for Home component
 */
export const homeScoresData = jsondata => processModelData(jsondata.model_data);
