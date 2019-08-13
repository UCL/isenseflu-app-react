/* eslint react/jsx-props-no-spreading: "off" */
import React from 'react';

import { createShallow } from '@material-ui/core/test-utils';

import RawScoresActions from './RawScoresActions';

test('renders RawScoresActions wihout crashing', () => {
  expect.assertions(2);
  const props = {
    modeldata: [],
    rowsPerPage: 10,
    count: 100,
    page: 1,
    onChangePage: () => {},
  };
  const shallow = createShallow();
  const wrapper = shallow(<RawScoresActions {...props} />);
  expect(wrapper.dive().type()).toBe('div');
  expect(wrapper.dive().children()).toHaveLength(4);
});
