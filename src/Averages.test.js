import React from 'react';

import { createShallow } from '@material-ui/core/test-utils';

import { Article } from './PublicTemplates';
import AveragesComponent from './Averages';

it('renders About without crashing', () => {
  const shallow = createShallow();
  const modeldata = [];
  const wrapper = shallow(<AveragesComponent modeldata={modeldata} />);
  expect(wrapper.find(Article)).toHaveLength(1);
});
