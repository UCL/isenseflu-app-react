/* eslint react/jsx-props-no-spreading: "off" */
import React from 'react';

import { createMount } from '@material-ui/core/test-utils';

import ScoreRow from './ScoreRow';

test('renders ScoreRowComponent wihout crashing', () => {
  expect.assertions(1);
  const props = {
    modelScores: [],
    scoreDate: '',
  };
  const mount = createMount();
  const wrapper = mount(<table><tbody><ScoreRow {...props} /></tbody></table>);
  expect(wrapper.exists('ForwardRef(TableRow)')).toBe(true);
});

test('adds 2 columns of model scores; total of 3 columns', () => {
  expect.assertions(1);
  const props = {
    modelScores: [{ model_id: 1, score_value: 1.0 }, { model_id: 2, score_value: 2.0 }],
    scoreDate: '2019-08-01',
  };
  const mount = createMount();
  const wrapper = mount(<table><tbody><ScoreRow {...props} /></tbody></table>);
  expect(wrapper.find(ScoreRow).find('ForwardRef(TableCell)')).toHaveLength(3);
});
