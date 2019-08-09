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

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';

import { Article } from './PublicTemplates';
import { generateChartData, generateChartOptions, getMaxScoreValue } from './ChartTemplate';

const styles = theme => ({
  lineChart: {
    padding: theme.spacing(2),
  },
  selectModel: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  permalink: {
    textAlign: 'center',
  },
});

const ChartComponent = (props) => {
  const {
    classes,
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
      <Grid item xs={12} className={classes.lineChart}>
        <Line data={chartData} options={chartOptions} />
      </Grid>
      <Grid item xs={11} className={classes.selectModel}>
        <Typography variant="h6">
          Select model to display
        </Typography>
        {modelcontrols}
      </Grid>
      <Grid item xs={1} className={classes.permalink}>
        <IconButton href={permalink}>
          <FontAwesomeIcon icon={faLink} />
        </IconButton>
      </Grid>
    </Article>
  );
};

ChartComponent.propTypes = {
  /** @type {Object} CSS classes used for styling the MUI component */
  classes: PropTypes.object.isRequired,

  /** @type {string} The title of the chart */
  charttitle: PropTypes.string.isRequired,

  /** @type {Object} The set rate thresholds as provided by PHE */
  ratethresholds: PropTypes.object.isRequired,

  /** Node containing toggle buttons to activate and deactivate models */
  modelcontrols: PropTypes.node.isRequired,

  /** @type {Object[]} Array containing the model metadata and scores */
  modeldata: PropTypes.array.isRequired,

  /** @type {string} Permanent link to a specific data set and parameters */
  permalink: PropTypes.string.isRequired,
};

export default withStyles(styles)(ChartComponent);
