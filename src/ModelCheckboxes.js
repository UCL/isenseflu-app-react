import React from 'react';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default class ModelCheckboxesComponent extends React.Component {

	state = {
		activeIds: []
	}

  render() {

		const { flagid, modellist, handleChangeCallback } = this.props;

		const { activeIds } = this.state;

    const models = modellist.map(model => {
			return (
				<FormGroup key={model.id}>
					<FormControlLabel
						control={
							<Switch
								value={String(model.id)}
								checked={model.id === flagid || activeIds.includes(model.id)}
								onChange={handleChangeCallback(model.id)}
								color="primary"/>
						}
						label={model.name}
					/>
				</FormGroup>
			);
  	});

		return (
			<React.Fragment>
				{models}
			</React.Fragment>
		);
	}

}
