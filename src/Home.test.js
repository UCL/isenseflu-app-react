/*
eslint {
  jest/no-hooks: [ "error", { "allow": [ "afterAll", "beforeAll" ] } ],
  jest/no-test-callback: "off",
  react/jsx-props-no-spreading: "off"
}
*/
import React from 'react';

import { shallow } from 'enzyme';

import HomeComponent from './Home';
import ChartComponent from './Chart';

beforeAll(() => {
  process.env = Object.assign(process.env, { REACT_APP_API_HOST: '/apipath/' });
});

test('when event.target.checked is false the modelId is removed from activeModels', () => {
  expect.assertions(3);
  const props = {
    location: { search: 'source=plink&id=1&id=2' },
  };
  const wrapper = shallow(<HomeComponent {...props} />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  instance.setState({
    activeModels: [1, 2],
    startDate: '2019-06-30',
    endDate: '2019-06-30',
    resolution: 'day',
    smoothing: 0,
  });
  expect(wrapper.state('activeModels')).toStrictEqual([1, 2]);
  const event = { target: { checked: false, value: 1 } };
  instance.handleChangeCallback(event, '2019-07-01', '2019-07-01', 'day', 0);
  expect(wrapper.state('activeModels')).toStrictEqual([2]);
  const { location } = window;
  const expected = `${location.protocol}//${location.host}${location.pathname}?source=plink&id=2&startDate=2019-06-30&endDate=2019-06-30&resolution=day&smoothing=0`;
  expect(wrapper.state('permaLink')).toStrictEqual(expected);
});

test('when event.target.checked is true the modelId is added to activeModels', (done) => {
  expect.assertions(7);
  try {
    const response = {
      model_data: [
        {
          id: 2,
          name: 'Model 2',
          average_score: 3.8055417187683727,
          has_confidence_interval: true,
          start_date: '2019-06-26',
          end_date: '2019-06-28',
          data_points: [
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
      ],
    };
    const jsonPromise = Promise.resolve(response);
    const fetchPromise = Promise.resolve({
      ok: true,
      json: () => jsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => fetchPromise);
    const props = {
      location: { search: '' },
    };
    const wrapper = shallow(<HomeComponent {...props} />, { disableLifecycleMethods: true });
    const instance = wrapper.instance();
    instance.setState({
      allDates: [],
      activeModels: [1],
      startDate: '2019-06-27',
      endDate: '2019-06-27',
      resolution: 'day',
      smoothing: 0,
    });
    expect(wrapper.state('activeModels')).toStrictEqual([1]);
    const event = { target: { checked: true, value: 2 } };
    instance.handleChangeCallback(event, '2019-06-26', '2019-06-28');
    process.nextTick(() => {
      expect(wrapper.state('activeModels')).toStrictEqual([1, 2]);
      expect(wrapper.state('allDates')).toStrictEqual(['2019-06-28', '2019-06-27', '2019-06-26']);
      expect(wrapper.state('startDate')).toStrictEqual('2019-06-26');
      expect(wrapper.state('endDate')).toStrictEqual('2019-06-28');
      const { location } = window;
      expect(wrapper.state('permaLink')).toStrictEqual(`${location.protocol}//${location.host}${location.pathname}?source=plink&id=1&id=2&startDate=2019-06-26&endDate=2019-06-28&resolution=day&smoothing=0`);
      expect(wrapper.state('modelData')).toHaveLength(1);
      global.fetch.mockReset();
      done();
    });
  } catch (e) {
    done(e);
  }
});

test('handleUpdateModel updates modelData, activeModels, startDate, endDate and allDates', () => {
  expect.assertions(9);
  const response = {
    model_data: [
      {
        id: 3,
        name: 'Model 3',
        average_score: 3.8055417187683727,
        has_confidence_interval: true,
        start_date: '2019-05-30',
        end_date: '2019-06-28',
        data_points: [
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
          {
            score_date: '2019-06-25',
            score_value: 4.52518177826309,
            confidence_interval_lower: 0.88545694725993,
            confidence_interval_upper: 8.16490660926624,
          },
          {
            score_date: '2019-06-24',
            score_value: 4.69189673106616,
            confidence_interval_lower: 1.2719937582229,
            confidence_interval_upper: 8.11179970390942,
          },
          {
            score_date: '2019-06-23',
            score_value: 4.59578669549021,
            confidence_interval_lower: 1.22851863462062,
            confidence_interval_upper: 7.96305475635981,
          },
          {
            score_date: '2019-06-22',
            score_value: 4.53303987156752,
            confidence_interval_lower: 1.29101711739689,
            confidence_interval_upper: 7.77506262573815,
          },
          {
            score_date: '2019-06-21',
            score_value: 4.80584541432755,
            confidence_interval_lower: 1.87268332580631,
            confidence_interval_upper: 7.73900750284879,
          },
          {
            score_date: '2019-06-20',
            score_value: 4.81214979509769,
            confidence_interval_lower: 1.83559311227191,
            confidence_interval_upper: 7.78870647792348,
          },
          {
            score_date: '2019-06-19',
            score_value: 4.72408420887802,
            confidence_interval_lower: 1.86179409786109,
            confidence_interval_upper: 7.58637431989494,
          },
          {
            score_date: '2019-06-18',
            score_value: 4.2657662452807,
            confidence_interval_lower: 1.27247654278507,
            confidence_interval_upper: 7.25905594777633,
          },
          {
            score_date: '2019-06-17',
            score_value: 4.05867566288166,
            confidence_interval_lower: 0.98083971647054,
            confidence_interval_upper: 7.13651160929278,
          },
          {
            score_date: '2019-06-16',
            score_value: 3.87000945227021,
            confidence_interval_lower: 0.979931102132896,
            confidence_interval_upper: 6.76008780240753,
          },
          {
            score_date: '2019-06-15',
            score_value: 3.49400543687058,
            confidence_interval_lower: 0.506897002056427,
            confidence_interval_upper: 6.48111387168474,
          },
          {
            score_date: '2019-06-14',
            score_value: 3.65554504949222,
            confidence_interval_lower: 0.702959693571767,
            confidence_interval_upper: 6.60813040541268,
          },
          {
            score_date: '2019-06-13',
            score_value: 3.68180110629985,
            confidence_interval_lower: 0.731715191751039,
            confidence_interval_upper: 6.63188702084866,
          },
          {
            score_date: '2019-06-12',
            score_value: 3.01537824388081,
            confidence_interval_lower: 0.0,
            confidence_interval_upper: 6.12462271627954,
          },
          {
            score_date: '2019-06-11',
            score_value: 2.90617816521479,
            confidence_interval_lower: 0.0,
            confidence_interval_upper: 5.88072638092851,
          },
          {
            score_date: '2019-06-10',
            score_value: 3.69629258246308,
            confidence_interval_lower: 0.468741334420545,
            confidence_interval_upper: 6.92384383050562,
          },
          {
            score_date: '2019-06-09',
            score_value: 4.00768538917216,
            confidence_interval_lower: 0.823260723295953,
            confidence_interval_upper: 7.19211005504836,
          },
          {
            score_date: '2019-06-08',
            score_value: 4.48898308732831,
            confidence_interval_lower: 1.48961416599185,
            confidence_interval_upper: 7.48835200866477,
          },
          {
            score_date: '2019-06-07',
            score_value: 4.62707854827418,
            confidence_interval_lower: 1.50224291164497,
            confidence_interval_upper: 7.75191418490339,
          },
          {
            score_date: '2019-06-06',
            score_value: 4.45144190043133,
            confidence_interval_lower: 1.57043040583764,
            confidence_interval_upper: 7.33245339502502,
          },
          {
            score_date: '2019-06-05',
            score_value: 3.99183181266009,
            confidence_interval_lower: 1.18959549244227,
            confidence_interval_upper: 6.79406813287791,
          },
          {
            score_date: '2019-06-04',
            score_value: 3.33402189895089,
            confidence_interval_lower: 0.622779216826664,
            confidence_interval_upper: 6.04526458107511,
          },
          {
            score_date: '2019-06-03',
            score_value: 2.5238040887112,
            confidence_interval_lower: 0.0,
            confidence_interval_upper: 5.45074449422866,
          },
          {
            score_date: '2019-06-02',
            score_value: 2.77746377157717,
            confidence_interval_lower: 0.00218891777080833,
            confidence_interval_upper: 5.55273862538353,
          },
          {
            score_date: '2019-06-01',
            score_value: 2.79959716877498,
            confidence_interval_lower: 0.0,
            confidence_interval_upper: 5.91083425587337,
          },
          {
            score_date: '2019-05-31',
            score_value: 1.88371714621743,
            confidence_interval_lower: 0.0,
            confidence_interval_upper: 4.86745410580692,
          },
          {
            score_date: '2019-05-30',
            score_value: 2.46960326827285,
            confidence_interval_lower: 0.0,
            confidence_interval_upper: 5.53204711749239,
          },
        ],
      },
    ],
  };
  const props = {
    location: { search: '' },
  };
  const wrapper = shallow(<HomeComponent {...props} />, { disableLifecycleMethods: true });
  const instance = wrapper.instance();
  expect(wrapper.state('activeModels')).toStrictEqual([]);
  expect(wrapper.state('modelData')).toHaveLength(0);
  expect(wrapper.state('startDate')).toStrictEqual('1970-01-01');
  expect(wrapper.state('allDates')).toHaveLength(0);
  instance.handleUpdateModel(response);
  expect(wrapper.state('activeModels')).toStrictEqual([3]);
  expect(wrapper.state('modelData')).toHaveLength(1);
  expect(wrapper.state('startDate')).toStrictEqual('2019-05-30');
  expect(wrapper.state('endDate')).toStrictEqual('2019-06-28');
  expect(wrapper.state('allDates')).toHaveLength(30);
});

test('componentDidMount set values for activeModels, allDates, modelList, startDate, endDate, rateThresholds and modelData', (done) => {
  expect.assertions(9);
  const response1 = {
    model_list: [
      { id: 1, name: 'Model name' },
      { id: 2, name: 'Model two name' },
    ],
    rate_thresholds: {
      low_value: { label: 'Low epidemic rate', value: 0 },
      medium_value: { label: 'Medium epidemic rate', value: 1 },
      high_value: { label: 'High epidemic rate', value: 2 },
      very_high_value: { label: ' Very high epidemic rate', value: 3 },
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
            confidence_interval_upper: 1.1,
          },
        ],
      },
    ],
  };
  const jsonPromise = Promise.resolve(response1);
  const fetchPromise = Promise.resolve({
    ok: true,
    json: () => jsonPromise,
  });
  jest.spyOn(global, 'fetch').mockImplementation(() => fetchPromise);
  const props = {
    location: { search: '' },
  };
  const wrapper = shallow(<HomeComponent {...props} />);
  expect(global.fetch).toHaveBeenCalledWith('/apipath/');
  process.nextTick(() => {
    expect(wrapper.state('activeModels')).toStrictEqual([1]);
    expect(wrapper.state('allDates')).toStrictEqual(['2019-06-01']);
    expect(wrapper.state('modelList')).toStrictEqual([
      { id: 1, name: 'Model name' },
      { id: 2, name: 'Model two name' },
    ]);
    expect(wrapper.state('startDate')).toStrictEqual('2019-06-01');
    expect(wrapper.state('endDate')).toStrictEqual('2019-06-01');
    expect(wrapper.state('permaLink')).toStrictEqual(window.location.href);
    expect(wrapper.state('modelData')).toStrictEqual([
      {
        averageScore: 1,
        datapoints: [
          {
            confidence_interval_lower: 0.9,
            confidence_interval_upper: 1.1,
            score_date: '2019-06-01',
            score_value: 1,
          },
        ],
        hasConfidenceInterval: true,
        id: 1,
        name: 'Model name',
      },
    ]);
    expect(wrapper.state('rateThresholds')).toStrictEqual(response1.rate_thresholds);
    global.fetch.mockReset();
    done();
  });
});

test('handleChartTitleUpdate sets state value for chartTitlePrefix to Weekly', () => {
  expect.assertions(4);
  const defaultTitle = 'Daily influenza-like illness rates';
  const updatedTitle = 'Weekly influenza-like illness rates';
  const props = {
    location: { search: 'source=plink&id=1&id=2' },
  };
  const wrapper = shallow(<HomeComponent {...props} />, { disableLifecycleMethods: true });
  expect(wrapper.state('chartTitlePrefix')).toStrictEqual('Daily');
  expect(wrapper.find(ChartComponent).dive().prop('charttitle')).toStrictEqual(defaultTitle);
  const instance = wrapper.instance();
  instance.handleChartTitleUpdate(true);
  expect(wrapper.state('chartTitlePrefix')).toStrictEqual('Weekly');
  expect(wrapper.find(ChartComponent).dive().prop('charttitle')).toStrictEqual(updatedTitle);
});

afterAll(() => {
  delete process.env.REACT_APP_API_HOST;
});
