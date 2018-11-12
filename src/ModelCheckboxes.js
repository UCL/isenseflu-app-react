import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default class ModelCheckboxesComponent extends React.Component {

  render() {

		const { flagid, modellist } = this.props;

    const models = modellist.map(model => {
			return (
				<FormGroup key={model.id}>
					<FormControlLabel
						control={
							<Checkbox value={String(model.id)} checked={model.id === flagid} color="primary"/>
						}
						label={model.name}
					/>
				</FormGroup>
			);
  	});

		return (
			<div className="px-4 py-2">
				{models}
			</div>
		);
	}

}
