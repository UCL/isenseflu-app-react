/* eslint react/jsx-props-no-spreading: "off" */
import React from 'react';

import { render, screen } from '@testing-library/react';

import ScoreRow from './ScoreRow';

test('renders ScoreRow wihout crashing', () => {
  expect.assertions(1);
  const props = {
    modelScores: [],
    scoreDate: '',
  };
  render(<table><tbody><ScoreRow {...props} /></tbody></table>);
  expect(screen.getByRole('row')).toBeInTheDocument();
});

test('adds 2 columns of model scores; total of 3 columns', () => {
  expect.assertions(1);
  const props = {
    modelScores: [{ model_id: 1, score_value: 1.0 }, { model_id: 2, score_value: 2.0 }],
    scoreDate: '2019-08-01',
  };
  render(<table><tbody><ScoreRow {...props} /></tbody></table>);
  expect(screen.getAllByRole('cell')).toHaveLength(3);
});
