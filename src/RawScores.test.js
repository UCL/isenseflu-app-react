import React from 'react';

import { createShallow } from '@material-ui/core/test-utils';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { generateQueryUrl, generateTableMatrix, RawScores } from './RawScores';
import { Article, FormFooter } from './PublicTemplates';

test('renders RawScoresComponent wihout crashing', () => {
  expect.assertions(1);
  const props = {
    allDates: [],
    endDate: '',
    modeldata: [],
    startDate: '',
  };
  const shallow = createShallow();
  const wrapper = shallow(<RawScores {...props} />);
  expect(wrapper.dive().find(Article)).toHaveLength(1);
});

test('returns queryUrl', () => {
  expect.assertions(1);
  const modeldata = [{ id: 1 }];
  const startDate = '2018-11-01';
  const endDate = '2018-11-30';
  const result = generateQueryUrl(modeldata, startDate, endDate);
  const re = /\/csv\?id=1&startDate=2018-11-01&endDate=2018-11-30&ctype=\.csv/;
  expect(result).toMatch(re);
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

test('changes page variable in state', () => {
  expect.assertions(2);
  const props = {
    allDates: [],
    endDate: '',
    modeldata: [],
    startDate: '',
  };
  const shallow = createShallow({ dive: true });
  const wrapper = shallow(<RawScores {...props} />);
  expect(wrapper.state('page')).toStrictEqual(0);
  wrapper.instance().handleChangePage(1);
  expect(wrapper.state('page')).toStrictEqual(1);
});

test('changes rowsPerPage variable in state', () => {
  expect.assertions(2);
  const props = {
    allDates: [],
    endDate: '',
    modeldata: [],
    startDate: '',
  };
  const shallow = createShallow({ dive: true });
  const wrapper = shallow(<RawScores {...props} />);
  expect(wrapper.state('rowsPerPage')).toStrictEqual(10);
  const event = {
    target: {
      value: 5,
    },
  };
  wrapper.instance().handleChangeRowsPerPage(event);
  expect(wrapper.state('rowsPerPage')).toStrictEqual(5);
});

test('renders a table header with 3 columns', () => {
  expect.assertions(4);
  const props = {
    allDates: [],
    endDate: '',
    modeldata: [
      { id: 1, name: 'Model 1' },
      { id: 2, name: 'Model 2' },
    ],
    startDate: '',
  };
  const shallow = createShallow({ dive: true });
  const wrapper = shallow(<RawScores {...props} />);
  const cells = wrapper.find(TableHead).find(TableRow).find(TableCell);
  expect(cells).toHaveLength(3);
  expect(cells.at(0).dive().childAt(0).text()).toStrictEqual('Date');
  expect(cells.at(1).dive().childAt(0).text()).toStrictEqual(`${props.modeldata[0].name} (England)`);
  expect(cells.at(2).dive().childAt(0).text()).toStrictEqual(`${props.modeldata[1].name} (England)`);
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
    modeldata,
    startDate: '2018-10-01',
    endDate: '2018-10-03',
  };
  const shallow = createShallow({ dive: true });
  const wrapper = shallow(<RawScores {...props} />);
  expect(wrapper.find(TableBody).children()).toHaveLength(3);
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
    modeldata,
    startDate: '2018-10-01',
    endDate: '2018-10-03',
  };
  const shallow = createShallow({ dive: true });
  const wrapper = shallow(<RawScores {...props} />);
  const button = wrapper.find(FormFooter).find(Button);
  expect(button.prop('download')).toBe(true);
  expect(button.prop('href'))
    .toBe('undefined/csv?id=1&id=2&startDate=2018-10-01&endDate=2018-10-03&ctype=.csv');
});
