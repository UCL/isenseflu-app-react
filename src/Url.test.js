/* eslint "jest/no-hooks": "off" */
import {
  dataFilteringPermalinkUrl,
  dataFilteringQueryUrl,
  homeFetchUrl,
  homeFetchScoresUrl,
  homePermalinkUrl,
  rawScoresCsvUrl,
} from './Url';

describe.each(['/apipath/', '/apipath'])('variable REACT_APP_API_HOST could end with or without an /', (apihost) => {
  beforeAll(() => {
    process.env = Object.assign(process.env, { REACT_APP_API_HOST: apihost });
  });

  test('generates URL for home when location.search is empty', () => {
    expect.assertions(1);
    const result = homeFetchUrl('');
    expect(result).toStrictEqual('/apipath/');
  });

  test('generates URL for home when location.search has a parameter source set to plink', () => {
    expect.assertions(1);
    const result = homeFetchUrl('?id=1&source=plink');
    expect(result).toStrictEqual('/apipath/plink?id=1');
  });

  test('generates URL for home when location.search has a parameter source set to twlink', () => {
    expect.assertions(1);
    const result = homeFetchUrl('?id=1&source=twlink');
    expect(result).toStrictEqual('/apipath/twlink?id=1');
  });

  test('generates URL for home to call scores endpoint', () => {
    expect.assertions(1);
    const result = homeFetchScoresUrl(1, '2019-06-01', '2019-06-02', 'week', 5);
    expect(result).toStrictEqual('/apipath/scores?id=1&startDate=2019-06-01&endDate=2019-06-02&resolution=week&smoothing=5');
  });

  test('generates URL for permaLink if location.search is empty', () => {
    expect.assertions(1);
    const result = homePermalinkUrl('', [1], '2019-06-01', '2019-06-02', 'week', 3);
    const { location } = window;
    const expected = `${location.protocol}//${location.host}${location.pathname}?source=plink&id=1&startDate=2019-06-01&endDate=2019-06-02&resolution=week&smoothing=3`;
    expect(result).toStrictEqual(expected);
  });

  test('generates URL for permalink if location.search comes from an existing permalink', () => {
    expect.assertions(1);
    const result = homePermalinkUrl('source=plink&id=1', [1, 2], '2019-06-01', '2019-06-02', 'week', 3);
    const { location } = window;
    const expected = `${location.protocol}//${location.host}${location.pathname}?source=plink&id=1&id=2&startDate=2019-06-01&endDate=2019-06-02&resolution=week&smoothing=3`;
    expect(result).toStrictEqual(expected);
  });

  test('generates URL for permalink if location.search comes from a Twitter link', () => {
    expect.assertions(1);
    const result = homePermalinkUrl('source=twlink&id=1', [1, 2], '2019-06-01', '2019-06-02', 'day', 0);
    const { location } = window;
    const expected = `${location.protocol}//${location.host}${location.pathname}?source=plink&id=1&id=2&startDate=2019-06-01&endDate=2019-06-02&resolution=day&smoothing=0`;
    expect(result).toStrictEqual(expected);
  });

  test('generates URL for datafiltering to fetch the model scores', () => {
    expect.assertions(1);
    const result = dataFilteringQueryUrl([1, 2], '2019-06-01', '2019-06-02', 'day', 0);
    const expected = '/apipath/scores?id=1&id=2&startDate=2019-06-01&endDate=2019-06-02&resolution=day&smoothing=0';
    expect(result).toStrictEqual(expected);
  });

  test('generates URL for permalink to be used in datafiltering component', () => {
    expect.assertions(1);
    const result = dataFilteringPermalinkUrl([1, 2], '2019-06-01', '2019-06-02', 'day', 0);
    const { location } = window;
    const expected = `${location.protocol}//${location.host}${location.pathname}?source=plink&id=1&id=2&startDate=2019-06-01&endDate=2019-06-02&resolution=day&smoothing=0`;
    expect(result).toStrictEqual(expected);
  });

  test('generates URL for exporting data as a CSV file', () => {
    expect.assertions(1);
    const modeldata = [{ id: 1 }];
    const startDate = '2018-11-01';
    const endDate = '2018-11-30';
    const resolution = 'week';
    const result = rawScoresCsvUrl(modeldata, startDate, endDate, resolution);
    const re = /\/csv\?id=1&startDate=2018-11-01&endDate=2018-11-30&resolution=week&ctype=\.csv/;
    expect(result).toMatch(re);
  });

  afterAll(() => {
    delete process.env.REACT_APP_API_HOST;
  });
});
