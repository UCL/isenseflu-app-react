import { homeFetchUrl, homeFetchScoresUrl, homePermalinkUrl } from './Url';

beforeAll(() => {
  process.env = Object.assign(process.env, { REACT_APP_API_HOST: '/apipath/' });
});

it('generates URL for home when location.search is empty', () => {
  const result = homeFetchUrl('');
  expect(result).toEqual('/apipath/')
});

it('generates URL for home when location.search has a parameter source set to plink', () => {
  const result = homeFetchUrl('?id=1&source=plink');
  expect(result).toEqual('/apipath/plink?id=1');
});

it('generates URL for home when location.search has a parameter source set to twlink', () => {
  const result = homeFetchUrl('?id=1&source=twlink');
  expect(result).toEqual('/apipath/twlink?id=1');
});

it('generates URL for home to call scores endpoint', () => {
  const result = homeFetchScoresUrl(1, '2019-06-01', '2019-06-02', 'week', 5);
  expect(result).toEqual('/apipath/scores?id=1&startDate=2019-06-01&endDate=2019-06-02&resolution=week&smoothing=5');
});

it('generates URL for permaLink if location.search is empty', () => {
  const result = homePermalinkUrl('', [1], '2019-06-01', '2019-06-02', 'week', 3);
  const expected = `${location.protocol}//${location.host}${location.pathname}?source=plink&id=1&startDate=2019-06-01&endDate=2019-06-02&resolution=week&smoothing=3`;
  expect(result).toEqual(expected);
});

it('generates URL for permalink if location.search comes from an existing permalink', () => {
  const result = homePermalinkUrl('source=plink&id=1', [1,2], '2019-06-01', '2019-06-02', 'week', 3);
  const expected = `${location.protocol}//${location.host}${location.pathname}?source=plink&id=1&id=2&startDate=2019-06-01&endDate=2019-06-02&resolution=week&smoothing=3`;
  expect(result).toEqual(expected);
});

it('generates URL for permalink if location.search comes from a Twitter link', () => {
  const result = homePermalinkUrl('source=twlink&id=1', [1,2], '2019-06-01', '2019-06-02', 'day', 0);
  const expected = `${location.protocol}//${location.host}${location.pathname}?source=plink&id=1&id=2&startDate=2019-06-01&endDate=2019-06-02&resolution=day&smoothing=0`;
  expect(result).toEqual(expected);
});

afterAll(() => {
  delete process.env.REACT_APP_API_HOST;
});
