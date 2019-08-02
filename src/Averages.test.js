import React from 'react';

import { createShallow } from '@material-ui/core/test-utils';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { Article } from './PublicTemplates';
import AveragesComponent from './Averages';

test('renders About without crashing', () => {
  expect.assertions(1);
  const shallow = createShallow();
  const modeldata = [];
  const wrapper = shallow(<AveragesComponent modeldata={modeldata} />);
  expect(wrapper.find(Article)).toHaveLength(1);
});

test('renders a table with the model name, region and average', () => {
  expect.assertions(5);
  const shallow = createShallow();
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
  const wrapper = shallow(<AveragesComponent modeldata={modeldata} />);
  const row = wrapper.find(TableBody).find(TableRow);
  expect(row).toHaveLength(1);
  const cells = row.find(TableCell);
  expect(cells).toHaveLength(3);
  expect(cells.at(0).dive().childAt(0).text()).toStrictEqual(modeldata[0].name);
  expect(cells.at(1).dive().childAt(0).text()).toStrictEqual('England');
  expect(cells.at(2).dive().childAt(0).text()).toStrictEqual('1');
});
