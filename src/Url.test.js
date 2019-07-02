import { homeFetchUrl, homeFetchScoresUrl } from './Url';

beforeAll(() => {
  process.env = Object.assign(process.env, { REACT_APP_API_HOST: 'http://localhost/' });
});

it('generates URL for home when location.search is empty', () => {
  const result = homeFetchUrl('');
  expect(result).toEqual('http://localhost/')
});

it('generates URL for home when location.search has a parameter source set to plink', () => {
  const result = homeFetchUrl('?id=1&source=plink');
  expect(result).toEqual('http://localhost/plink?id=1');
});

it('generates URL for home when location.search has a parameter source set to twlink', () => {
  const result = homeFetchUrl('?id=1&source=twlink');
  expect(result).toEqual('http://localhost/twlink?id=1');
});

it('generates URL for home to call scores endpoint', () => {
  const result = homeFetchScoresUrl(1, '2019-06-01', '2019-06-02');
  expect(result).toEqual('http://localhost/scores?id=1&startDate=2019-06-01&endDate=2019-06-02');
});

afterAll(() => {
  delete process.env.REACT_APP_API_HOST;
});
