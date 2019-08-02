import React from 'react';
import { Route } from 'react-router-dom';

import { createShallow } from '@material-ui/core/test-utils';

import App from './App';
import NavigationBar from './NavigationBar';

test('renders App without crashing', () => {
  expect.assertions(2);
  const shallow = createShallow();
  const wrapper = shallow(<App />);
  // it should render 3 routes
  expect(wrapper.dive().find(Route)).toHaveLength(3);
  // it should render 1 NavigationBar
  expect(wrapper.dive().find(NavigationBar)).toHaveLength(1);
});
