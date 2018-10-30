import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import DataFilteringComponent, {generateQueryUrl} from './DataFiltering';
import {Article} from './PublicTemplates';

it('renders DataFilteringComponent wihout crashing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<DataFilteringComponent />);
  const result = renderer.getRenderOutput();
  expect(result.type).toBe(Article);
});

it('generates query url', () => {
  const props = {
    endDate: '2018-11-01',
    startDate: '2018-10-01',
    modelId: 1,
    apiHost: 'h'
  };
  const resolution = 7;
  const smoothing = 0;

  const params = {...props, resolution, smoothing};

  const result = generateQueryUrl(params);
  const re = 'h/scores/1\?startDate\=2018\-10\-01&endDate\=2018\-11\-01&resolution\=7&smoothing\=0';
  expect(result).toMatch(re);
});
