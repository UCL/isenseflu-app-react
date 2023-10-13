/* eslint react/jsx-props-no-spreading: "off" */
import React from 'react';

import { render, screen, within } from '@testing-library/react';

import { generateTableMatrix, RawScores } from './RawScores';

jest.mock('@material-ui/core/TablePagination', () => {
  return jest.fn().mockImplementation(() => <td>TABLEPAGINATION</td>);
});

test('renders RawScores headings wihout crashing', () => {
  expect.assertions(1);
  const props = {
    allDates: [],
    endDate: '',
    modeldata: [],
    resolution: 'day',
    startDate: '',
  };
  render(<RawScores {...props} />);
  expect(screen.getByText('Raw Scores')).toBeInTheDocument();
});

test('renders RawScores with allDates set to undefined', () => {
  expect.assertions(1);
  const props = {
    allDates: undefined,
    endDate: '',
    modeldata: [],
    resolution: 'day',
    startDate: '',
  };
  const spy = jest.spyOn(console, 'error').mockImplementation();
  render(<RawScores {...props} />);
  expect(spy).toHaveBeenCalledTimes(1);
});

test('generates table matrix', () => {
  expect.assertions(2);
  const resultUndefined = generateTableMatrix(undefined, undefined);
  expect(resultUndefined).toStrictEqual([]);
  const allDates = ['2018-10-01', '2018-10-02', '2018-10-03'];
  const modeldata = [
    {
      id: 1,
      datapoints: [
        {
          score_date: '2018-10-01',
          score_value: 0.1,
        },
        {
          score_date: '2018-10-02',
          score_value: 0.2,
        },
      ],
    },
    {
      id: 2,
      datapoints: [
        {
          score_date: '2018-10-02',
          score_value: 0.3,
        },
        {
          score_date: '2018-10-03',
          score_value: 0.4,
        },
      ],
    },
  ];
  const result = generateTableMatrix(allDates, modeldata);
  const expected = [
    {
      scoreDate: '2018-10-01',
      modelScores: [
        { model_id: 1, score_value: 0.1 },
        { model_id: 2, score_value: undefined },
      ],
    },
    {
      scoreDate: '2018-10-02',
      modelScores: [
        { model_id: 1, score_value: 0.2 },
        { model_id: 2, score_value: 0.3 },
      ],
    },
    {
      scoreDate: '2018-10-03',
      modelScores: [
        { model_id: 1, score_value: undefined },
        { model_id: 2, score_value: 0.4 },
      ],
    },
  ];
  expect(result).toStrictEqual(expected);
});


test('renders a table header with 3 columns', () => {
  expect.assertions(4);
  const props = {
    allDates: [],
    endDate: '',
    resolution: 'day',
    modeldata: [
      { id: 1, name: 'Model 1' },
      { id: 2, name: 'Model 2' },
    ],
    startDate: '',
  };
  render(<RawScores {...props} />);
  const ths = screen.getAllByRole('columnheader');
  expect(ths).toHaveLength(3);
  expect(ths[0]).toHaveTextContent('Date');
  expect(ths[1]).toHaveTextContent(`${props.modeldata[0].name} (England)`);
  expect(ths[2]).toHaveTextContent(`${props.modeldata[1].name} (England)`);
});

test('renders a table body with 3 rows', () => {
  expect.assertions(1);
  const allDates = ['2018-10-01', '2018-10-02', '2018-10-03'];
  const modeldata = [
    {
      id: 1,
      datapoints: [
        {
          score_date: '2018-10-01',
          score_value: 0.1,
        },
        {
          score_date: '2018-10-02',
          score_value: 0.2,
        },
      ],
    },
    {
      id: 2,
      datapoints: [
        {
          score_date: '2018-10-02',
          score_value: 0.3,
        },
        {
          score_date: '2018-10-03',
          score_value: 0.4,
        },
      ],
    },
  ];
  const props = {
    allDates,
    resolution: 'day',
    modeldata,
    startDate: '2018-10-01',
    endDate: '2018-10-03',
  };
  render(<RawScores {...props} />);
  const rowgroups = screen.getAllByRole('rowgroup');
  expect(within(rowgroups[1]).getAllByRole('row')).toHaveLength(3);
});

test('renders a form footer with a download button', () => {
  expect.assertions(2);
  const allDates = ['2018-10-01', '2018-10-02', '2018-10-03'];
  const modeldata = [
    {
      id: 1,
      datapoints: [
        {
          score_date: '2018-10-01',
          score_value: 0.1,
        },
        {
          score_date: '2018-10-02',
          score_value: 0.2,
        },
      ],
    },
    {
      id: 2,
      datapoints: [
        {
          score_date: '2018-10-02',
          score_value: 0.3,
        },
        {
          score_date: '2018-10-03',
          score_value: 0.4,
        },
      ],
    },
  ];
  const props = {
    allDates,
    resolution: 'week',
    modeldata,
    startDate: '2018-10-01',
    endDate: '2018-10-03',
  };
  render(<RawScores {...props} />);
  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('download');
  expect(link).toHaveAttribute(
    'href',
    'undefined/csv?id=1&id=2&startDate=2018-10-01&endDate=2018-10-03&resolution=week&ctype=.csv'
  );
});
