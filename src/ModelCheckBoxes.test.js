/* eslint react/jsx-props-no-spreading: "off" */
import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ModelCheckboxes from './ModelCheckboxes';

test('renders a list of three ModelCheckboxes', () => {
  expect.assertions(2);
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
  render(<ModelCheckboxes {...props} />);
  expect(screen.getAllByRole('checkbox')).toHaveLength(3);
  expect(screen.getAllByText(/Model [1-3]/)).toHaveLength(3);
});

test('toggling a checkbox calls handleChangeCallback', () => {
  // expect.assertions(1);
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
  render(<ModelCheckboxes {...props} />);
  userEvent.click(screen.getAllByRole('checkbox')[2]);
  expect(mockHandleChangeCallback).toHaveBeenCalledWith(
    expect.anything(), '2019-01-01', '2019-01-31', 'day', 0,
  );
});
