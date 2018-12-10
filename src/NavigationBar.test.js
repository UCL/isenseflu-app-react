import React from 'react';

import Button from '@material-ui/core/Button';
import { createShallow } from '@material-ui/core/test-utils';

import NavigationBar from './NavigationBar';

it('renders DataFilteringComponent wihout crashing', () => {
  const shallow = createShallow();
  const wrapper = shallow(<NavigationBar />);
  // it should have 3 buttons
  expect(wrapper.dive().find(Button)).toHaveLength(3);
});
