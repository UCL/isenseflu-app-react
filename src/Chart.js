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

import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

import {
  Chart as ChartJs,
  Filler,
  Legend,
  LineController,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';

import { Article } from './PublicTemplates';
import { generateChartData, generateChartOptions, getMaxScoreValue } from './ChartTemplate';

ChartJs.register(
  Filler,
  Legend,
  LineController,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
  annotationPlugin,
);

const LineChart = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const ModelSelector = styled(Grid)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

const ChartComponent = (props) => {
  const {
    charttitle,
    ratethresholds,
    modelcontrols,
    modeldata,
    permalink,
  } = props;

  const chartData = generateChartData(modeldata);
  const maxscorevalue = getMaxScoreValue(modeldata);
  const chartOptions = generateChartOptions(ratethresholds, maxscorevalue);

  return (
    <Article header={charttitle}>
      <LineChart item xs={12}>
        <Line data={chartData} options={chartOptions} />
      </LineChart>
      <ModelSelector item xs={11}>
        <Typography variant="h6">
          Select model to display
        </Typography>
        {modelcontrols}
      </ModelSelector>
      <Grid item xs={1} sx={{ textAlign: 'center' }}>
        <IconButton href={permalink} size="large">
          <FontAwesomeIcon icon={faLink} />
        </IconButton>
      </Grid>
    </Article>
  );
};

ChartComponent.propTypes = {
  /** @type {string} The title of the chart */
  charttitle: PropTypes.string.isRequired,

  /** @type {Object} The set rate thresholds as provided by PHE */
  ratethresholds: PropTypes.object.isRequired,

  /** Node containing toggle buttons to activate and deactivate models */
  modelcontrols: PropTypes.node.isRequired,

  /** @type {Object[]} Array containing the model metadata and scores */
  modeldata: PropTypes.arrayOf(PropTypes.object).isRequired,

  /** @type {string} Permanent link to a specific data set and parameters */
  permalink: PropTypes.string.isRequired,
};

export { ChartComponent as default };
