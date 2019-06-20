/**
 * Converts a JSON response into an object with state variables for the Home component
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
  const startDate = new Date(Math.min.apply(null, datesList.map(e => { return new Date(e) })));
  const endDate = new Date(Math.max.apply(null, datesList.map(e => { return new Date(e) })));

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
