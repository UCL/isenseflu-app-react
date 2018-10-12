import React, { Component } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

export default class ModelCheckboxesComponent extends Component {

  render() {
    this.props.modellist.map(model => {
			return (
				<FormGroup check inline>
					<Label check>
						<Input type="checkbox" value={model.id} checked={model.id === this.props.modeldata.id}/>
						{model.name}
					</Label>
				</FormGroup>
			);
  	});
	}

}
