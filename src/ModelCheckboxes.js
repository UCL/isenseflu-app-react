import React, { Component } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

export default class ModelCheckboxesComponent extends Component {

  render() {
    const models = this.props.modellist.map(model => {
			return (
				<FormGroup check inline>
					<Label check>
						<Input type="checkbox" value={model.id} checked={model.id === this.props.flagid}/>
						{model.name}
					</Label>
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
