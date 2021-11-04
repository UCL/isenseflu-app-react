/*
eslint {
  jest/no-hooks: [ "error", { "allow": [ "afterAll", "beforeAll" ] } ],
  jest/no-test-callback: "off",
  react/jsx-props-no-spreading: "off"
}
*/
import React from 'react';

import { render, screen } from '@testing-library/react';

import HomeComponent from './Home';
import ChartComponent from './Chart';

jest.mock('./Chart', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>CHART</div>;
    }
  }
});

jest.mock('./RawScores', () => {
  return {
    RawScores: () => {
      return <div>RAWSCORES</div>;
    }
  }
});

beforeAll(() => {
  process.env = Object.assign(process.env, { REACT_APP_API_HOST: '/apipath/' });
});

test('renders HomeComponent calls fetch once', () => {
  const fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(
    () => Promise.resolve({ ok: false })
  );
  const props = {
    location: { search: 'source=plink&id=1&id=2' },
  };
  const page = render(<HomeComponent {...props} />);
  expect(fetchSpy).toHaveBeenCalledTimes(1);
});

afterAll(() => {
  delete process.env.REACT_APP_API_HOST;
});
