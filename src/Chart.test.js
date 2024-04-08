/* eslint react/jsx-props-no-spreading: "off" */
import React from 'react';

import { render, screen } from '@testing-library/react';

import ChartComponent from './Chart';
import { Article } from './PublicTemplates';

jest.mock('react-chartjs-2', () => {
  const { forwardRef } = require('react');
  const Line = forwardRef((props, ref) => <div ref={ref} {...props}></div>);
  return {
    Line,
  };
});

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
