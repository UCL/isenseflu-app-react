import React from 'react';

import { createShallow } from '@material-ui/core/test-utils';

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
  const expected = 'http://localhost/?source=plink&start=2018-10-01&end=2018-11-01&resolution=day&smoothing=0&id=1&id=2';
  expect(result).toEqual(expected);
});
