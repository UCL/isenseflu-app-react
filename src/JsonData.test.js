import { homeModelData, homeScoresData } from './JsonData';

it('converts JSON response from / or /plink or /twlink path into a state object for Home', () => {
  const response = {
    model_list: [
      {id: 1, name: 'Model name'},
      {id: 2, name: 'Model two name'}
    ],
    rate_thresholds: {
      low_value: { label: 'Low epidemic rate', value: 0 },
      medium_value: { label: 'Medium epidemic rate', value: 1 },
      high_value: { label: 'High epidemic rate', value: 2 },
      very_high_value: { label: ' Very high epidemic rate', value: 3}
    },
    model_data: [
      {
        id: 1,
        name: 'Model name',
        has_confidence_interval: true,
        display_model: true,
        start_date: '2019-06-01',
        end_date: '2019-06-01',
        average_score: 1.0,
        data_points: [
          {
            score_date: '2019-06-01',
            score_value: 1.0,
            confidence_interval_lower: 0.9,
            confidence_interval_upper: 1.1
          }
        ]
      },
      {
        id: 2,
        name: 'Model two name',
        has_confidence_interval: true,
        display_model: true,
        start_date: '2019-06-01',
        end_date: '2019-06-01',
        average_score: 2.0,
        data_points: [
          {
            score_date: '2019-06-01',
            score_value: 2.0,
            confidence_interval_lower: 1.9,
            confidence_interval_upper: 2.1
          }
        ]
      }
    ]
  };
  const result = homeModelData(response);
  const expected = {
    modelData: [
      {
        id: 1,
        name: 'Model name',
        averageScore: 1,
        hasConfidenceInterval: true,
        datapoints: [
          {
            score_date: '2019-06-01',
            score_value: 1.0,
            confidence_interval_lower: 0.9,
            confidence_interval_upper: 1.1
          }
        ]
      },
      {
        id: 2,
        name: 'Model two name',
        averageScore: 2,
        hasConfidenceInterval: true,
        datapoints: [
          {
            score_date: '2019-06-01',
            score_value: 2.0,
            confidence_interval_lower: 1.9,
            confidence_interval_upper: 2.1
          }
        ]
      }
    ],
    startDate: '2019-06-01',
    endDate: '2019-06-01',
    modelList: [{id: 1, name: 'Model name'}, {id: 2, name: 'Model two name'}],
    activeModels: [1, 2],
    rateThresholds: {
      low_value: { label: 'Low epidemic rate', value: 0 },
      medium_value: { label: 'Medium epidemic rate', value: 1 },
      high_value: { label: 'High epidemic rate', value: 2 },
      very_high_value: { label: ' Very high epidemic rate', value: 3}
    },
    allDates: ['2019-06-01']
  };
  expect(result).toEqual(expected);
});

it('converts JSON response from /scores into a state object for Home', () => {
  const response = [
    {
      id: 1,
      name: 'Model name',
      has_confidence_interval: true,
      display_model: true,
      start_date: '2019-06-01',
      end_date: '2019-06-02',
      average_score: 1.5,
      data_points: [
        {
          score_date: '2019-06-01',
          score_value: 1.0,
          confidence_interval_lower: 0.9,
          confidence_interval_upper: 1.1
        },
        {
          score_date: '2019-06-02',
          score_value: 2.0,
          confidence_interval_lower: 1.9,
          confidence_interval_upper: 2.1
        }
      ]
    }
  ]
  const result = homeScoresData(response);
  const expected = {
    id: 1,
    name: 'Model name',
    datapoints: [
      {
        score_date: '2019-06-01',
        score_value: 1,
        confidence_interval_lower: 0.9,
        confidence_interval_upper: 1.1
      },
      {
        score_date: '2019-06-02',
        score_value: 2,
        confidence_interval_lower: 1.9,
        confidence_interval_upper: 2.1
      }
    ],
    hasConfidenceInterval: true,
    startDate: '2019-06-01',
    endDate: '2019-06-02',
    modelDates: [ '2019-06-01', '2019-06-02' ]
  }
  expect(result).toEqual(expected);
});
