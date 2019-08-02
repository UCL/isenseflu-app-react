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
