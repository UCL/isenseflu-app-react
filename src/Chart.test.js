import React from 'react';
import ReactDOM from 'react-dom';

import { shallow } from 'enzyme';

import ChartComponent, {formatModelname, generateAnnotations, getMaxScoreValue} from './Chart';
import {Article} from './PublicTemplates';

it('renders ChartComponent without crashing', () => {
  const props = {
    charttitle: '',
    modelcontrols: React.createElement('span'),
    modeldata: [],
    modelannotations: {},
    permalink: '',
  }
  const wrapper = shallow(<ChartComponent {...props}/>);
  expect(wrapper.dive().find(Article)).toHaveLength(1);
});
