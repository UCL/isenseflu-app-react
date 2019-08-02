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

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class ModelCheckboxesComponent extends React.Component {
  state = {
    activeIds: [],
  }

  render() {
    const { flagid, modellist, handleChangeCallback } = this.props;

    const { activeIds } = this.state;

    const models = modellist.map(model => (
      <FormGroup key={model.id}>
        <FormControlLabel
          control={(
            <Switch
              value={String(model.id)}
              checked={model.id === flagid || activeIds.includes(model.id)}
              onChange={handleChangeCallback(model.id)}
              color="primary"
            />
          )}
          label={model.name}
        />
      </FormGroup>
    ));

    return (
      <React.Fragment>
        {models}
      </React.Fragment>
    );
  }
}

ModelCheckboxesComponent.propTypes = {
  /** Id of the model to toggle as active */
  flagid: PropTypes.number.isRequired,

  /** Callback function to pass value of switches */
  handleChangeCallback: PropTypes.func.isRequired,

  /** Complete list of public models available */
  modellist: PropTypes.object.isRequired,
};

export default ModelCheckboxesComponent;
