import React from 'react';
import { Route } from 'react-router-dom';

import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import App from './App';
import NavigationBar from './NavigationBar';

jest.mock('./Home', () => {
  return jest.fn().mockImplementation(() => <div>you are home</div>);
});

jest.mock('./PublicTemplates', () => {
  return {
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
  const history = createMemoryHistory();
  render(<Router history={history}><App /></Router>);
  expect(screen.getByText('you are home')).toBeTruthy();
});

test('renders App with different routes', () => {
  expect.assertions(2);
  const history = createMemoryHistory();
  history.push('/about');
  render(<Router history={history}><App /></Router>);
  expect(screen.getByText('you are about')).toBeTruthy();
  history.push('/docs');
  render(<Router history={history}><App /></Router>);
  expect(screen.getByText('you are docs')).toBeTruthy();
});
