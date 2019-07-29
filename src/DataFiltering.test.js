import React from 'react';

import { createShallow } from '@material-ui/core/test-utils';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';

import DataFilteringComponent, { generateQueryUrl, generatePermalinkUrl } from './DataFiltering';
import { Article } from './PublicTemplates';

it('renders DataFilteringComponent wihout crashing', () => {
  const props = {
    modelIds: [1, 2]
  }
  const shallow = createShallow();
  const wrapper = shallow(<DataFilteringComponent {...props} />);
  expect(wrapper.dive().find(Article)).toHaveLength(1);
});

it('generates query url', () => {
  const props = {
    endDate: '2018-11-01',
    startDate: '2018-10-01',
    modelIds: [1],
    apiHost: 'h'
  };
  const resolution = 7;
  const smoothing = 0;

  const params = {...props, resolution, smoothing};

  const result = generateQueryUrl(params);
  const re = 'h/scores\?id\=1&startDate\=2018\-10\-01&endDate\=2018\-11\-01&resolution\=7&smoothing\=0';
  expect(result).toMatch(re);
});

it('generates permalink url', () => {
  const props = {
    endDate: '2018-11-01',
    startDate: '2018-10-01',
    modelIds: [1, 2]
  };
  const resolution = 'day';
  const smoothing = 0;

  const params = {...props, resolution, smoothing};

  const result = generatePermalinkUrl(params);
  const expected = 'http://localhost/?source=plink&startDate=2018-10-01&endDate=2018-11-01&resolution=day&smoothing=0&id=1&id=2';
  expect(result).toEqual(expected);
});

it('passes isWeekly to chartTitleCallback', () => {
  const handlePropsChange = (event) => {}
  const props = {
    modelIds: [1],
    onChangeCallback: handlePropsChange
  }
  const shallow = createShallow();
  const wrapper = shallow(<DataFilteringComponent {...props} />).dive();
  const instance = wrapper.instance();
  jest.spyOn(instance, 'handleSubmit');
  const selectResolution = wrapper.find(Select).first().dive();
  const submitButton = wrapper.find(Button).dive();
  selectResolution.prop('onChange')({target: {type: 'select-one', value: 'week', name: 'resolution'}});
  submitButton.simulate('submit');
  expect(instance.handleSubmit).toHaveBeenCalledWith(expect.anything(), expect.anything(), true);
  selectResolution.prop('onChange')({target: {type: 'select-one', value: 'day', name: 'resolution'}});
  submitButton.simulate('submit');
  expect(instance.handleSubmit).toHaveBeenCalledWith(expect.anything(), expect.anything(), false);
});
