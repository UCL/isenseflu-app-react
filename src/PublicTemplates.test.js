import React from 'react';

import { render, screen } from '@testing-library/react';

import {
  About,
  Article,
  Docs,
  FormFooter,
} from './PublicTemplates';

test('renders About iframe without crashing', () => {
  expect.assertions(1);
  render(<About />);
  expect(document.querySelector('iframe')).toBeInTheDocument();
});

test('renders Article without crashing', () => {
  expect.assertions(2);
  render(<Article header="header"><span>SPAN TEXT</span></Article>);
  expect(screen.getByText('header')).toBeInTheDocument();
  expect(screen.getByText('SPAN TEXT')).toBeInTheDocument();
});

test('renders Docs iframe without crashing', () => {
  expect.assertions(1);
  render(<Docs />);
  expect(document.querySelector('iframe')).toBeInTheDocument();
});

test('renders FormFooter without crashing', () => {
  expect.assertions(1);
  render(<FormFooter><span>SPAN TEXT</span></FormFooter>);
  expect(screen.getByText('SPAN TEXT')).toBeInTheDocument();
});
