/* eslint jest/no-hooks: [ "error", { "allow": [ "afterAll", "beforeAll" ] } ] */
import React from 'react';

import { createShallow } from '@material-ui/core/test-utils';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';

import DataFilteringComponent from './DataFiltering';
import { Article } from './PublicTemplates';

beforeAll(() => {
  process.env = Object.assign(process.env, { REACT_APP_API_HOST: '/apipath/' });
});

test('renders DataFilteringComponent wihout crashing', () => {
  expect.assertions(1);
  const props = {
    chartTitleCallback: jest.fn(),
    endDate: '',
    modelIds: [1, 2],
    onChangeCallback: jest.fn(),
    permalinkCallback: jest.fn(),
    resolution: '',
    smoothing: 0,
    startDate: '',
    updateCallback: jest.fn(),
  };
  const shallow = createShallow();
  const wrapper = shallow(<DataFilteringComponent {...props} />);
  expect(wrapper.dive().find(Article)).toHaveLength(1);
});

test('passes isWeekly to chartTitleCallback', () => {
  expect.assertions(2);
  const props = {
    chartTitleCallback: jest.fn(),
    endDate: '',
    modelIds: [1],
    onChangeCallback: jest.fn(),
    permalinkCallback: jest.fn(),
    resolution: '',
    smoothing: 0,
    startDate: '',
    updateCallback: jest.fn(),
  };
  const shallow = createShallow();
  const wrapper = shallow(<DataFilteringComponent {...props} />).dive();
  const instance = wrapper.instance();
  jest.spyOn(instance, 'handleSubmit');
  const selectResolution = wrapper.find(Select).first().dive();
  const submitButton = wrapper.find(Button).dive();
  selectResolution.prop('onChange')({ target: { type: 'select-one', value: 'week', name: 'resolution' } });
  submitButton.simulate('submit');
  expect(instance.handleSubmit).toHaveBeenCalledWith(expect.anything(), expect.anything(), true);
  selectResolution.prop('onChange')({ target: { type: 'select-one', value: 'day', name: 'resolution' } });
  submitButton.simulate('submit');
  expect(instance.handleSubmit).toHaveBeenCalledWith(expect.anything(), expect.anything(), false);
});

afterAll(() => {
  delete process.env.REACT_APP_API_HOST;
});
