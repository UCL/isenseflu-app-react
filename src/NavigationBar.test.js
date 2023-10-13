import React from 'react';

import { render, screen } from '@testing-library/react';

import NavigationBar from './NavigationBar';

test('renders NavigationBar wihout crashing', () => {
  expect.assertions(1);
  render(<NavigationBar />);
  // it should have 3 buttons
  expect(screen.getAllByRole('link')).toHaveLength(4);
});
