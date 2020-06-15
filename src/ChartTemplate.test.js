import {
  createColour, formatModelname, getMaxScoreValue, generateChartData, generateChartOptions,
} from './ChartTemplate';

describe('creates colours in hex format', () => {
  it('when index is lower than 6', () => {
    expect.assertions(1);
    const result = createColour(0);
    expect(result).toMatch(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
  });
  it('when index is greater or equal to 6', () => {
    expect.assertions(1);
    const result = createColour(6);
    expect(result).toMatch(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
  });
});

describe('it appends the suffix (England) to the model name', () => {
  it('when georegion is set to e', () => {
    expect.assertions(1);
    const result = formatModelname('Model', 'e');
    expect(result).toBe('Model (England)');
  });
  it('when georegion is undefined', () => {
    expect.assertions(1);
    const result = formatModelname('Model', undefined);
    expect(result).toBe('Model');
  });
});

describe('gets max score value from datapoints array', () => {
  it('when there is one model with confidence interval scores', () => {
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

  it('when there is more than one model, then the confidence interval is not used', () => {
    expect.assertions(1);
    const modeldata = [
      {
        id: 1,
        name: 'Model 1',
        hasConfidenceInterval: true,
        averageScore: 3.49504958214849,
        datapoints: [
          {
            score_date: '2019-06-28',
            score_value: 3.49504958214849,
            confidence_interval_lower: 0.263175153943189,
            confidence_interval_upper: 6.72692401035379,
          },
        ],
      },
      {
        id: 2,
        name: 'Model 2',
        hasConfidenceInterval: true,
        averageScore: 3.5872420985975,
        datapoints: [
          {
            score_date: '2019-06-27',
            score_value: 3.5872420985975,
            confidence_interval_lower: 0.237621760695548,
            confidence_interval_upper: 6.93686243649945,
          },
        ],
      },
    ];
    const result = getMaxScoreValue(modeldata);
    expect(result).toBe(3.5872420985975);
  });
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
  it('for thresholddata set to undefined', () => {
    expect.assertions(1);
    const result = generateChartOptions(undefined, 14.1);
    const { annotation } = result;
    expect(annotation.annotations).toHaveLength(0);
  });
});

describe('generates the data for the chart', () => {
  it('for modeldata set to undefined', () => {
    expect.assertions(1);
    const result = generateChartData(undefined);
    expect(result).toStrictEqual({});
  });

  it('for modeldata set to an empty array', () => {
    expect.assertions(1);
    const modeldata = [];
    const result = generateChartData(modeldata);
    expect(result).toStrictEqual({});
  });

  it('for modeldata with one model without confidence interval', () => {
    expect.assertions(1);
    const modeldata = [
      {
        id: 3,
        name: 'Model 3',
        hasConfidenceInterval: false,
        averageScore: 3.8055417187683727,
        datapoints: [
          {
            score_date: '2019-06-28',
            score_value: 3.49504958214849,
          },
          {
            score_date: '2019-06-27',
            score_value: 3.5872420985975,
          },
          {
            score_date: '2019-06-26',
            score_value: 4.39709536259043,
          },
        ],
      },
    ];
    const result = generateChartData(modeldata);
    const expected = {
      datasets: [
        {
          label: 'Model 3',
          fill: false,
          borderColor: 'rgba(0, 123, 255, 1)',
          backgroundColor: 'rgba(63, 127, 191, 0.2)',
          data: [
            { t: new Date('2019-06-28'), y: 3.49504958214849 },
            { t: new Date('2019-06-27'), y: 3.5872420985975 },
            { t: new Date('2019-06-26'), y: 4.39709536259043 },
          ],
          pointStyle: 'line',
        },
      ],
    };
    expect(result).toStrictEqual(expected);
  });

  it('for modeldata with one model with confidence interval', () => {
    expect.assertions(1);
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
    const result = generateChartData(modeldata);
    const expected = {
      datasets: [
        {
          label: 'Model 3',
          fill: false,
          borderColor: 'rgba(0, 123, 255, 1)',
          backgroundColor: 'rgba(63, 127, 191, 0.2)',
          data: [
            { t: new Date('2019-06-28'), y: 3.49504958214849 },
            { t: new Date('2019-06-27'), y: 3.5872420985975 },
            { t: new Date('2019-06-26'), y: 4.39709536259043 },
          ],
          pointStyle: 'line',
        },
        {
          label: 'Upper confidence interval',
          fill: false,
          borderColor: 'rgba(168, 198, 224, 1)',
          data: [
            { t: new Date('2019-06-28'), y: 6.72692401035379 },
            { t: new Date('2019-06-27'), y: 6.93686243649945 },
            { t: new Date('2019-06-26'), y: 8.25145407702749 },
          ],
          pointStyle: 'line',
        },
        {
          label: 'Lower confidence interval',
          fill: 1,
          borderColor: 'rgba(168, 198, 224, 1)',
          backgroundColor: 'rgba(63, 127, 191, 0.2)',
          data: [
            { t: new Date('2019-06-28'), y: 0.263175153943189 },
            { t: new Date('2019-06-27'), y: 0.237621760695548 },
            { t: new Date('2019-06-26'), y: 0.542736648153371 },
          ],
          pointStyle: 'line',
        },
      ],
    };
    expect(result).toStrictEqual(expected);
  });
  it('for modeldata with 2 models', () => {
    expect.assertions(1);
    const modeldata = [
      {
        id: 1,
        name: 'Model 1',
        datapoints: [
          {
            score_date: '2019-06-28',
            score_value: 3.49504958214849,
          },
          {
            score_date: '2019-06-27',
            score_value: 3.5872420985975,
          },
        ],
      },
      {
        id: 2,
        name: 'Model 2',
        datapoints: [
          {
            score_date: '2019-06-28',
            score_value: 2.49504958214849,
          },
          {
            score_date: '2019-06-27',
            score_value: 2.5872420985975,
          },
        ],
      },
    ];
    const result = generateChartData(modeldata);
    const expected = {
      datasets: [
        {
          label: 'Model 1',
          fill: false,
          borderColor: '#381460',
          backgroundColor: '#381460',
          data: [
            { t: new Date('2019-06-28'), y: 3.49504958214849 },
            { t: new Date('2019-06-27'), y: 3.5872420985975 },
          ],
          pointStyle: 'line',
        },
        {
          label: 'Model 2',
          fill: false,
          borderColor: '#ffbd69',
          backgroundColor: '#ffbd69',
          data: [
            { t: new Date('2019-06-28'), y: 2.49504958214849 },
            { t: new Date('2019-06-27'), y: 2.5872420985975 },
          ],
          pointStyle: 'line',
        },
      ],
    };
    expect(result).toStrictEqual(expected);
  });
});
