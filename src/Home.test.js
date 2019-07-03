import React from 'react';

import { shallow } from 'enzyme';

import HomeComponent from './Home';

it('when event.target.checked is false the modelId is removed from activeModels', () => {
  const props = {
    modeldata : [],
    location: { search: '' }
  }
  const modelList = [ { id: 1, name: 'Model 1'}, { id: 2, name: 'Model 2' } ];
  const wrapper = shallow(<HomeComponent {...props}/>);
  const instance = wrapper.instance();
  instance.setState({
    modelList: modelList,
    activeModels: [1, 2]
  });
  expect(wrapper.state('activeModels')).toEqual([1, 2]);
  const event = {target: { checked: false, value: 1 }};
  instance.handleChangeCallback(event, '2019-07-01', '2019-07-01');
  expect(wrapper.state('activeModels')).toEqual([2]);
});
