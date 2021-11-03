/* eslint jest/no-hooks: [ "error", { "allow": [ "afterAll", "beforeAll" ] } ],
react/jsx-props-no-spreading: "off" */
import React from 'react';

import { render, screen, fireEvent, prettyDOM, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DataFilteringComponent from './DataFiltering';

beforeAll(() => {
  process.env = Object.assign(process.env, { REACT_APP_API_HOST: '/apipath/' });
});

test('renders DataFilteringComponent wihout crashing', () => {
  expect.assertions(1);
  const props = {
    chartTitleCallback: jest.fn(),
    endDate: '',
    errorCallback: jest.fn(),
    modelIds: [1, 2],
    onChangeCallback: jest.fn(),
    permalinkCallback: jest.fn(),
    resolution: '',
    smoothing: 0,
    startDate: '',
    updateCallback: jest.fn(),
  };
  render(<DataFilteringComponent {...props} />);
  expect(screen.getByText('Data Filtering')).toBeInTheDocument();
});

test('function handlePropsChange calls onChangeCallback and toggles isDisabled', () => {
  // expect.assertions(2);
  const props = {
    chartTitleCallback: jest.fn(),
    endDate: '',
    errorCallback: jest.fn(),
    modelIds: [1],
    onChangeCallback: jest.fn(),
    permalinkCallback: jest.fn(),
    resolution: '',
    smoothing: 0,
    startDate: '',
    updateCallback: jest.fn(),
  };
  render(<DataFilteringComponent {...props} />);
  expect(screen.getByText('Show data').closest('button')).toBeDisabled();
  // Reimplement after upgrade of Material UI
  //expect(props.onChangeCallback).toHaveBeenCalledTimes(1);
  //expect(wrapper.state('isDisabled')).toBe(false);
});

/* eslint jest/no-test-callback: "off" */
describe('handleSubmit calls updateCallback, chartTitleCallback and permalinkCallback', () => {
  it('when the API does return OK', (done) => {
    // expect.assertions(4);
    const jsondata = { jsondata: 'OK' };
    const fetchPromise = Promise.resolve({
      ok: true,
      json: () => Promise.resolve(jsondata),
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => fetchPromise);
    const props = {
      chartTitleCallback: jest.fn(),
      endDate: '',
      errorCallback: jest.fn(),
      modelIds: [1],
      onChangeCallback: jest.fn(),
      permalinkCallback: jest.fn(),
      resolution: '',
      smoothing: 0,
      startDate: '',
      updateCallback: jest.fn(),
    };

    process.nextTick(() => {
      // implement after upgrade
      global.fetch.mockReset();
      done();
    });
  });
  it('when the API does not return OK', (done) => {
    // expect.assertions(4);
    const fetchPromise = Promise.resolve({
      ok: false,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => fetchPromise);
    const props = {
      chartTitleCallback: jest.fn(),
      endDate: '',
      errorCallback: jest.fn(),
      modelIds: [1],
      onChangeCallback: jest.fn(),
      permalinkCallback: jest.fn(),
      resolution: '',
      smoothing: 0,
      startDate: '',
      updateCallback: jest.fn(),
    };

    process.nextTick(() => {
      // implement after upgrade
      global.fetch.mockReset();
      done();
    });
  });
});

test('passes isWeekly to chartTitleCallback', () => {
  // expect.assertions(2);
  const props = {
    chartTitleCallback: jest.fn(),
    endDate: '',
    errorCallback: jest.fn(),
    modelIds: [1],
    onChangeCallback: jest.fn(),
    permalinkCallback: jest.fn(),
    resolution: '',
    smoothing: 0,
    startDate: '',
    updateCallback: jest.fn(),
  };
  // implement after upgrade
});

afterAll(() => {
  delete process.env.REACT_APP_API_HOST;
});
