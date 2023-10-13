/* eslint react/jsx-props-no-spreading: "off" */
import React from 'react';

import { render, screen } from '@testing-library/react';

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
  render(<ChartComponent {...props} />);
  expect(screen.getByText('Select model to display')).toBeInTheDocument();
});
