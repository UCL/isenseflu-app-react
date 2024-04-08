import React from 'react';

import { render, screen } from '@testing-library/react';

import App from './App';

jest.mock('./Home', () => ({
  __esModule: true,
  default: () => <div>you are home</div>,
}));

jest.mock('./PublicTemplates', () => ({
  __esModule: true,
  About: () => <div>you are about</div>,
  Docs: () => <div>you are docs</div>,
}));

test('renders App with default route', () => {
  expect.assertions(1);
  render(<App />);
  expect(screen.getByText('you are home')).toBeInTheDocument();
});
