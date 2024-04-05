import React from 'react';

import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import App from './App';
import NavigationBar from './NavigationBar';

jest.mock('./Home', () => {
  return {
    __esModule: true,
    default: () => {
      return <div>you are home</div>;
    },
  };
});

jest.mock('./PublicTemplates', () => {
  return {
    __esModule: true,
    About: () => {
      return <div>you are about</div>;
    },
    Docs: () => {
      return <div>you are docs</div>;
    }
  }
});

test('renders App with default route', () => {
  expect.assertions(1);
  render(<App />);
  expect(screen.getByText('you are home')).toBeInTheDocument();
});
