import React from 'react';

import { render, screen, within } from '@testing-library/react';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import AveragesComponent from './Averages';

test('renders AveragesComponent table without crashing ', () => {
  expect.assertions(1);
  const modeldata = [];
  render(<AveragesComponent modeldata={modeldata} />);
  expect(screen.getByRole('table')).toBeInTheDocument();
});

test('renders a table with the model name, region and average', () => {
  expect.assertions(4);
  const modeldata = [
    {
      id: 1,
      name: 'Model 1',
      datapoints: [
        { score_value: 0.5 },
        { score_value: 1.0 },
        { score_value: 1.5 },
      ],
    },
  ];
  render(<AveragesComponent modeldata={modeldata} />);
  const tbody = screen.getAllByRole('rowgroup')[1];
  expect(tbody).toBeInTheDocument();
  const cells = within(tbody).getAllByRole('cell');
  expect(cells[0]).toHaveTextContent(modeldata[0].name);
  expect(cells[1]).toHaveTextContent('England');
  expect(cells[2]).toHaveTextContent('1');
});
