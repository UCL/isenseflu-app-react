import React from 'react';

import { createShallow } from '@material-ui/core/test-utils';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { generateQueryUrl, generateTableMatrix, RawScores } from './RawScores';
import { Article, FormFooter } from './PublicTemplates';

it('renders RawScoresComponent wihout crashing', () => {
  const props = {
    modeldata: []
  }
  const shallow = createShallow();
  const wrapper = shallow(<RawScores {...props} />);
  expect(wrapper.dive().find(Article)).toHaveLength(1);
});

it('returns queryUrl', () => {
  const modeldata = [{id: 1}];
  const startDate = '2018-11-01';
  const endDate = '2018-11-30';
  const result = generateQueryUrl(modeldata, startDate, endDate);
  const re = '/csv\?id\=1&startDate\=2018\-11\-01&endDate\=2018\-11\-30&ctype\=.csv';
  expect(result).toMatch(re);
});

it('generates table matrix', () => {
  const resultUndefined = generateTableMatrix(undefined, undefined);
  expect(resultUndefined).toEqual([]);
  const allDates = ['2018-10-01', '2018-10-02', '2018-10-03'];
  const modeldata = [
    {
      id: 1,
      datapoints: [
        {
          score_date: '2018-10-01',
          score_value: 0.1
        },
        {
          score_date: '2018-10-02',
          score_value: 0.2
        }
      ]
    },
    {
      id: 2,
      datapoints: [
        {
          score_date: '2018-10-02',
          score_value: 0.3
        },
        {
          score_date: '2018-10-03',
          score_value: 0.4
        }
      ]
    }
  ];
  const result = generateTableMatrix(allDates, modeldata);
  const expected = [
    {
      score_date: '2018-10-01',
      model_scores: [
        { model_id: 1, score_value: 0.1 },
        { model_id: 2, score_value: undefined }
      ]
    },
    {
      score_date: '2018-10-02',
      model_scores: [
        { model_id: 1, score_value: 0.2 },
        { model_id: 2, score_value: 0.3 }
      ]
    },
    {
      score_date: '2018-10-03',
      model_scores: [
        { model_id: 1, score_value: undefined },
        { model_id: 2, score_value: 0.4 }
      ]
    }
  ]
  expect(result).toEqual(expected);
});

it('changes page variable in state', () => {
  const props = {
    modeldata: []
  }
  const shallow = createShallow({dive: true});
  const wrapper = shallow(<RawScores {...props} />);
  expect(wrapper.state('page')).toEqual(0);
  wrapper.instance().handleChangePage(1)(undefined);
  expect(wrapper.state('page')).toEqual(1);
});

it('changes rowsPerPage variable in state', () => {
  const props = {
    modeldata: []
  }
  const shallow = createShallow({dive: true});
  const wrapper = shallow(<RawScores {...props} />);
  expect(wrapper.state('rowsPerPage')).toEqual(10);
  const event = {
    target: {
      value: 5
    }
  };
  wrapper.instance().handleChangeRowsPerPage(event);
  expect(wrapper.state('rowsPerPage')).toEqual(5);
});

it('renders a table header with 3 columns', () => {
  const props = {
    modeldata: [
      {id: 1, name: 'Model 1'},
      {id: 2, name: 'Model 2'}
    ]
  }
  const shallow = createShallow({dive: true});
  const wrapper = shallow(<RawScores {...props} />);
  const cells = wrapper.find(TableHead).find(TableRow).find(TableCell);
  expect(cells).toHaveLength(3);
  expect(cells.at(0).dive().childAt(0).text()).toEqual('Date');
  expect(cells.at(1).dive().childAt(0).text()).toEqual(props.modeldata[0].name);
  expect(cells.at(2).dive().childAt(0).text()).toEqual(props.modeldata[1].name);
});

it('renders a table body with 3 rows', () => {
  const allDates = ['2018-10-01', '2018-10-02', '2018-10-03'];
  const modeldata = [
    {
      id: 1,
      datapoints: [
        {
          score_date: '2018-10-01',
          score_value: 0.1
        },
        {
          score_date: '2018-10-02',
          score_value: 0.2
        }
      ]
    },
    {
      id: 2,
      datapoints: [
        {
          score_date: '2018-10-02',
          score_value: 0.3
        },
        {
          score_date: '2018-10-03',
          score_value: 0.4
        }
      ]
    }
  ];
  const props = {
    allDates,
    modeldata,
    startDate: '2018-10-01',
    endDate: '2018-10-03'
  };
  const shallow = createShallow({dive: true});
  const wrapper = shallow(<RawScores {...props} />);
  const cells = wrapper.find(TableBody);
  expect(wrapper.find(TableBody).children()).toHaveLength(3);
});

it('renders a form footer with a download button', () => {
  const allDates = ['2018-10-01', '2018-10-02', '2018-10-03'];
  const modeldata = [
    {
      id: 1,
      datapoints: [
        {
          score_date: '2018-10-01',
          score_value: 0.1
        },
        {
          score_date: '2018-10-02',
          score_value: 0.2
        }
      ]
    },
    {
      id: 2,
      datapoints: [
        {
          score_date: '2018-10-02',
          score_value: 0.3
        },
        {
          score_date: '2018-10-03',
          score_value: 0.4
        }
      ]
    }
  ];
  const props = {
    allDates,
    modeldata,
    startDate: '2018-10-01',
    endDate: '2018-10-03'
  };
  const shallow = createShallow({dive: true});
  const wrapper = shallow(<RawScores {...props} />);
  const button = wrapper.find(FormFooter).find(Button);
  expect(button.prop('download')).toBe(true);
  expect(button.prop('href'))
  .toBe('undefined/csv?id=1&id=2&startDate=2018-10-01&endDate=2018-10-03&ctype=.csv');
});
