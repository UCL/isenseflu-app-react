/* eslint react/jsx-props-no-spreading: "off" */
import React from 'react';

import { shallow } from 'enzyme';

import ChartComponent from './Chart';
import { Article } from './PublicTemplates';

test('renders ChartComponent without crashing', () => {
  expect.assertions(1);
  const props = {
    charttitle: '',
    modelcontrols: React.createElement('span'),
    modeldata: [],
    ratethresholds: {},
    permalink: '',
  };
  const wrapper = shallow(<ChartComponent {...props} />);
  expect(wrapper.dive().find(Article)).toHaveLength(1);
});
