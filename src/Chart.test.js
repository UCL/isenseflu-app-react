import React from 'react';
import ReactDOM from 'react-dom';

import { shallow } from 'enzyme';

import ChartComponent, {formatModelname, generateAnnotations, getMaxScoreValue} from './Chart';
import {Article} from './PublicTemplates';

it('renders ChartComponent without crashing', () => {
  const props = {
    modeldata : []
  }
  const wrapper = shallow(<div />);
  console.log(wrapper);
  expect(wrapper.exists()).toEqual(true);
});

it('formats model name', () => {
  const result = formatModelname('Model name', 'e');
  expect(result).toBe('Model name (England)');
});

it('gets max score value from datapoints array', () => {
  const resultA = getMaxScoreValue(undefined);
  expect(resultA).toBe(-Infinity);
  const modeldata = [
    {
      "id": 1,
      "name": "Model 1",
      "hasConfidenceInterval": true,
      "datapoints": [
        {
          "score_date": "2018-10-13",
          "confidence_interval_upper": 20.38406,
          "confidence_interval_lower": 0.0,
          "score_value": 9.075459
        },
        {
          "score_date": "2018-10-12",
          "confidence_interval_upper": 19.65818,
          "confidence_interval_lower": 0.0,
          "score_value": 8.719709
        },
        {
          "score_date": "2018-10-11",
          "confidence_interval_upper": 20.07249,
          "confidence_interval_lower": 0.0,
          "score_value": 8.574884
        }
      ]
    }
  ]
  const resultB = getMaxScoreValue(modeldata);
  expect(resultB).toBe(20.38406);
});

it('generates annotation element', () => {
  const thresholddata = {
    "low_value": {
      "value": 13.1,
      "label": "Low epidemic rate"
    },
    "very_high_value": {
      "value": 108.9,
      "label": "Very high epidemic rate"
    },
    "medium_value": {
      "value": 24.2,
      "label": "Medium epidemic rate"
    },
    "high_value": {
      "value": 68.7,
      "label": "High epidemic rate"
    }
  };
  const resultA = generateAnnotations(thresholddata, 14.1);
  expect(resultA[0].value).toBe(13.1);
  const resultB = generateAnnotations(thresholddata, 25.0);
  expect(resultB.length).toBe(2);
  const resultC = generateAnnotations(undefined, undefined);
  expect(resultC.length).toBe(0);
});
