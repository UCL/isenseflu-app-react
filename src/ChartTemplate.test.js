import { createColour, formatModelname, getMaxScoreValue, generateChartOptions } from './ChartTemplate';

test('it returns a colour in hex format', () => {
  const result = createColour(0);
  expect(result).toMatch(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
});

test('it appends the suffix (England) to the model name', () => {
  const result = formatModelname('Model', 'e');
  expect(result).toBe('Model (England)');
});

test('gets max score value from datapoints array', () => {
  const resultA = getMaxScoreValue(undefined);
  expect(resultA).toBe(-Infinity);
  const modeldata = [
    {
      id: 3,
      name: 'Model 3',
      hasConfidenceInterval: true,
      averageScore: 3.8055417187683727,
      datapoints: [
        {score_date: '2019-06-28', score_value: 3.49504958214849, confidence_interval_lower: 0.263175153943189, confidence_interval_upper: 6.72692401035379},
        {score_date: '2019-06-27', score_value: 3.5872420985975, confidence_interval_lower: 0.237621760695548, confidence_interval_upper: 6.93686243649945},
        {score_date: '2019-06-26', score_value: 4.39709536259043, confidence_interval_lower: 0.542736648153371, confidence_interval_upper: 8.25145407702749},
        {score_date: '2019-06-25', score_value: 4.52518177826309, confidence_interval_lower: 0.88545694725993, confidence_interval_upper: 8.16490660926624},
        {score_date: '2019-06-24', score_value: 4.69189673106616, confidence_interval_lower: 1.2719937582229, confidence_interval_upper: 8.11179970390942},
        {score_date: '2019-06-23', score_value: 4.59578669549021, confidence_interval_lower: 1.22851863462062, confidence_interval_upper: 7.96305475635981},
        {score_date: '2019-06-22', score_value: 4.53303987156752, confidence_interval_lower: 1.29101711739689, confidence_interval_upper: 7.77506262573815},
        {score_date: '2019-06-21', score_value: 4.80584541432755, confidence_interval_lower: 1.87268332580631, confidence_interval_upper: 7.73900750284879},
        {score_date: '2019-06-20', score_value: 4.81214979509769, confidence_interval_lower: 1.83559311227191, confidence_interval_upper: 7.78870647792348},
        {score_date: '2019-06-19', score_value: 4.72408420887802, confidence_interval_lower: 1.86179409786109, confidence_interval_upper: 7.58637431989494},
        {score_date: '2019-06-18', score_value: 4.2657662452807, confidence_interval_lower: 1.27247654278507, confidence_interval_upper: 7.25905594777633},
        {score_date: '2019-06-17', score_value: 4.05867566288166, confidence_interval_lower: 0.98083971647054, confidence_interval_upper: 7.13651160929278},
        {score_date: '2019-06-16', score_value: 3.87000945227021, confidence_interval_lower: 0.979931102132896, confidence_interval_upper: 6.76008780240753},
        {score_date: '2019-06-15', score_value: 3.49400543687058, confidence_interval_lower: 0.506897002056427, confidence_interval_upper: 6.48111387168474},
        {score_date: '2019-06-14', score_value: 3.65554504949222, confidence_interval_lower: 0.702959693571767, confidence_interval_upper: 6.60813040541268},
        {score_date: '2019-06-13', score_value: 3.68180110629985, confidence_interval_lower: 0.731715191751039, confidence_interval_upper: 6.63188702084866},
        {score_date: '2019-06-12', score_value: 3.01537824388081, confidence_interval_lower: 0.0, confidence_interval_upper: 6.12462271627954},
        {score_date: '2019-06-11', score_value: 2.90617816521479, confidence_interval_lower: 0.0, confidence_interval_upper: 5.88072638092851},
        {score_date: '2019-06-10', score_value: 3.69629258246308, confidence_interval_lower: 0.468741334420545, confidence_interval_upper: 6.92384383050562},
        {score_date: '2019-06-09', score_value: 4.00768538917216, confidence_interval_lower: 0.823260723295953, confidence_interval_upper: 7.19211005504836},
        {score_date: '2019-06-08', score_value: 4.48898308732831, confidence_interval_lower: 1.48961416599185, confidence_interval_upper: 7.48835200866477},
        {score_date: '2019-06-07', score_value: 4.62707854827418, confidence_interval_lower: 1.50224291164497, confidence_interval_upper: 7.75191418490339},
        {score_date: '2019-06-06', score_value: 4.45144190043133, confidence_interval_lower: 1.57043040583764, confidence_interval_upper: 7.33245339502502},
        {score_date: '2019-06-05', score_value: 3.99183181266009, confidence_interval_lower: 1.18959549244227, confidence_interval_upper: 6.79406813287791},
        {score_date: '2019-06-04', score_value: 3.33402189895089, confidence_interval_lower: 0.622779216826664, confidence_interval_upper: 6.04526458107511},
        {score_date: '2019-06-03', score_value: 2.5238040887112, confidence_interval_lower: 0.0, confidence_interval_upper: 5.45074449422866},
        {score_date: '2019-06-02', score_value: 2.77746377157717, confidence_interval_lower: 0.00218891777080833, confidence_interval_upper: 5.55273862538353},
        {score_date: '2019-06-01', score_value: 2.79959716877498, confidence_interval_lower: 0.0, confidence_interval_upper: 5.91083425587337},
        {score_date: '2019-05-31', score_value: 1.88371714621743, confidence_interval_lower: 0.0, confidence_interval_upper: 4.86745410580692},
        {score_date: '2019-05-30', score_value: 2.46960326827285, confidence_interval_lower: 0.0, confidence_interval_upper: 5.53204711749239}
      ]
    }
  ];
  const resultB = getMaxScoreValue(modeldata);
  expect(resultB).toBe(8.25145407702749);
});

describe('Adds threshold lines as annotation elements in chart.js', () => {
  const thresholddata = {
    "low_value": {
      "value": 13.1,
      "label": "Low epidemic rate"
    },
    "medium_value": {
      "value": 24.2,
      "label": "Medium epidemic rate"
    },
    "high_value": {
      "value": 68.7,
      "label": "High epidemic rate"
    },
    "very_high_value": {
      "value": 108.9,
      "label": "Very high epidemic rate"
    },
  };
  test.each([[14.1, 13.1], [25.0, 24.2], [70.0, 68.7], [110.0, 108.9]])(
    'For a score of %f adds a threshold line of %f', (score, threshold) => {
      const result = generateChartOptions(thresholddata, score);
      const { annotation } = result;
      const idx = annotation.annotations.length - 1;
      expect(annotation.annotations[idx].value).toBe(threshold);
  });
  test('For a score value set to undefined it does not add a threshold line', () => {
    const result = generateChartOptions(thresholddata, undefined);
    const { annotation } = result;
    expect(annotation.annotations.length).toBe(0);
  });
});
