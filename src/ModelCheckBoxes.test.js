import React from 'react';

import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import { createMount } from '@material-ui/core/test-utils';

import ModelCheckboxes from './ModelCheckboxes';

test('renders ModelCheckboxes without crashing', () => {
  expect.assertions(1);
  const mount = createMount();
  const props = {
    activeIds: [],
    endDate: '2019-01-31',
    handleChangeCallback: jest.fn(),
    modellist: [],
    resolution: 'day',
    smoothing: 0,
    startDate: '2019-01-01',
  };
  const wrapper = mount(<ModelCheckboxes {...props} />);
  expect(wrapper.exists()).toBe(true);
  mount.cleanUp();
});

test('renders a list of three ModelCheckboxes', () => {
  expect.assertions(1);
  const mount = createMount();
  const props = {
    activeIds: [1],
    endDate: '2019-01-31',
    handleChangeCallback: jest.fn(),
    modellist: [
      { id: 1, name: 'Model 1' },
      { id: 2, name: 'Model 2' },
      { id: 3, name: 'Model 3' },
    ],
    resolution: 'day',
    smoothing: 0,
    startDate: '2019-01-01',
  };
  const wrapper = mount(<ModelCheckboxes {...props} />);
  expect(wrapper.find(FormGroup)).toHaveLength(3);
  mount.cleanUp();
});

test('toggling a checkbox calls handleChangeCallback', () => {
  expect.assertions(1);
  const mount = createMount();
  const mockHandleChangeCallback = jest.fn();
  const props = {
    activeIds: [1],
    endDate: '2019-01-31',
    handleChangeCallback: mockHandleChangeCallback,
    modellist: [
      { id: 1, name: 'Model 1' },
      { id: 2, name: 'Model 2' },
      { id: 3, name: 'Model 3' },
    ],
    resolution: 'day',
    smoothing: 0,
    startDate: '2019-01-01',
  };
  const wrapper = mount(<ModelCheckboxes {...props} />);
  wrapper.find(Switch).at(1).find('input').simulate('change');
  expect(mockHandleChangeCallback).toHaveBeenCalledWith(
    expect.anything(), '2019-01-01', '2019-01-31', 'day', 0,
  );
});
