/* eslint jest/no-hooks: [ "error", { "allow": [ "afterAll", "beforeAll" ] } ],
react/jsx-props-no-spreading: "off" */
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
    errorCallback: jest.fn(),
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

test('function handlePropsChange calls onChangeCallback and toggles isDisabled', () => {
  expect.assertions(2);
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
  const shallow = createShallow();
  const wrapper = shallow(<DataFilteringComponent {...props} />).dive();
  const instance = wrapper.instance();
  instance.handlePropsChange({});
  expect(props.onChangeCallback).toHaveBeenCalledTimes(1);
  expect(wrapper.state('isDisabled')).toBe(false);
});

/* eslint jest/no-test-callback: "off" */
describe('handleSubmit calls updateCallback, chartTitleCallback and permalinkCallback', () => {
  it('when the API does return OK', (done) => {
    expect.assertions(4);
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
    const shallow = createShallow();
    const wrapper = shallow(<DataFilteringComponent {...props} />).dive();
    const instance = wrapper.instance();
    const isWeekly = true;
    wrapper.setState({ isDisabled: false });
    instance.handleSubmit('/apihost', '/permalinkUrl', isWeekly)({ preventDefault: jest.fn() });
    process.nextTick(() => {
      expect(props.updateCallback).toHaveBeenCalledWith(jsondata);
      expect(props.chartTitleCallback).toHaveBeenCalledWith(isWeekly);
      expect(props.permalinkCallback).toHaveBeenCalledWith('/permalinkUrl');
      expect(wrapper.state('isDisabled')).toBe(true);
      global.fetch.mockReset();
      done();
    });
  });
  it('when the API does not return OK', (done) => {
    expect.assertions(4);
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
    const shallow = createShallow();
    const wrapper = shallow(<DataFilteringComponent {...props} />).dive();
    const instance = wrapper.instance();
    const isWeekly = true;
    wrapper.setState({ isDisabled: false });
    instance.handleSubmit('/apihost', '/permalinkUrl', isWeekly)({ preventDefault: jest.fn() });
    process.nextTick(() => {
      expect(props.errorCallback).toHaveBeenCalledTimes(1);
      expect(props.chartTitleCallback).toHaveBeenCalledTimes(0);
      expect(props.permalinkCallback).toHaveBeenCalledWith('/permalinkUrl');
      expect(wrapper.state('isDisabled')).toBe(true);
      global.fetch.mockReset();
      done();
    });
  });
});

test('passes isWeekly to chartTitleCallback', () => {
  expect.assertions(2);
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
