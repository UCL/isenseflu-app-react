/*
eslint {
  jest/no-hooks: [ "error", { "allow": [ "afterAll", "beforeAll" ] } ],
  react/jsx-props-no-spreading: "off"
}
*/
import React from 'react';

import { act, render } from '@testing-library/react';

import HomeComponent from './Home';

jest.mock('./Chart', () => ({
  __esModule: true,
  default: () => <div>CHART</div>,
}));

jest.mock('./RawScores', () => ({
  RawScores: () => <div>RAWSCORES</div>,
}));

beforeAll(() => {
  process.env = Object.assign(process.env, { REACT_APP_API_HOST: '/apipath/' });
});

test('renders HomeComponent calls fetch once', async () => {
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(
    () => Promise.resolve({ ok: false }),
  );
  const props = {
    location: { search: 'source=plink&id=1&id=2' },
  };
  await act(() => {
    render(<HomeComponent {...props} />);
  });
  expect(fetchSpy).toHaveBeenCalledTimes(1);
});

afterAll(() => {
  delete process.env.REACT_APP_API_HOST;
});
