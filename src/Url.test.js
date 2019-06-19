import { homeFetchUrl } from './Url';

beforeAll(() => {
  process.env = Object.assign(process.env, { REACT_APP_API_HOST: 'http://localhost/' });
});

it('generates URL for home when location.search is empty', () => {
  let result = homeFetchUrl('');
  expect(result).toEqual('http://localhost/')
});

it('generates URL for home when location.search has a parameter source set to plink', () => {
  let result = homeFetchUrl('?id=1&source=plink');
  expect(result).toEqual('http://localhost/plink?id=1');
});

it('generates URL for home when location.search has a parameter source set to twlink', () => {
  let result = homeFetchUrl('?id=1&source=twlink');
  expect(result).toEqual('http://localhost/twlink?id=1');
});

afterAll(() => {
  delete process.env.REACT_APP_API_HOST;
});
