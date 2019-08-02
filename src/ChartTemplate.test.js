import {
  createColour, formatModelname, getMaxScoreValue, generateChartOptions,
} from './ChartTemplate';

test('it returns a colour in hex format', () => {
  expect.assertions(1);
  const result = createColour(0);
  expect(result).toMatch(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
});

test('it appends the suffix (England) to the model name', () => {
  expect.assertions(1);
  const result = formatModelname('Model', 'e');
  expect(result).toBe('Model (England)');
});

test('gets max score value from datapoints array', () => {
  expect.assertions(2);
  const resultA = getMaxScoreValue(undefined);
  expect(resultA).toBe(-Infinity);
  const modeldata = [
    {
      id: 3,
      name: 'Model 3',
      hasConfidenceInterval: true,
      averageScore: 3.8055417187683727,
      datapoints: [
        {
          score_date: '2019-06-28',
          score_value: 3.49504958214849,
          confidence_interval_lower: 0.263175153943189,
          confidence_interval_upper: 6.72692401035379,
        },
        {
          score_date: '2019-06-27',
          score_value: 3.5872420985975,
          confidence_interval_lower: 0.237621760695548,
          confidence_interval_upper: 6.93686243649945,
        },
        {
          score_date: '2019-06-26',
          score_value: 4.39709536259043,
          confidence_interval_lower: 0.542736648153371,
          confidence_interval_upper: 8.25145407702749,
        },
      ],
    },
  ];
  const resultB = getMaxScoreValue(modeldata);
  expect(resultB).toBe(8.25145407702749);
});

describe('adds threshold lines as annotation elements in chart.js', () => {
  const thresholddata = {
    low_value: {
      value: 13.1,
      label: 'Low epidemic rate',
    },
    medium_value: {
      value: 24.2,
      label: 'Medium epidemic rate',
    },
    high_value: {
      value: 68.7,
      label: 'High epidemic rate',
    },
    very_high_value: {
      value: 108.9,
      label: 'Very high epidemic rate',
    },
  };
  it.each([[14.1, 13.1], [25.0, 24.2], [70.0, 68.7], [110.0, 108.9]])(
    'for a score of %f adds a threshold line of %f', (score, threshold) => {
      const result = generateChartOptions(thresholddata, score);
      const { annotation } = result;
      const idx = annotation.annotations.length - 1;
      expect(annotation.annotations[idx].value).toBe(threshold);
    },
  );
  it('for a score value set to undefined it does not add a threshold line', () => {
    expect.assertions(1);
    const result = generateChartOptions(thresholddata, undefined);
    const { annotation } = result;
    expect(annotation.annotations).toHaveLength(0);
  });
});
