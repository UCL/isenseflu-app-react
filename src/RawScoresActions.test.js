/* eslint react/jsx-props-no-spreading: "off" */
import React from 'react';

import { render, screen, prettyDOM } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RawScoresActions from './RawScoresActions';

test('renders RawScoresActions four buttons without crashing', () => {
  expect.assertions(1);
  const props = {
    modeldata: [],
    rowsPerPage: 10,
    count: 100,
    page: 1,
    onChangePage: () => {},
  };
  render(<RawScoresActions {...props} />);
  expect(screen.getAllByRole('button')).toHaveLength(4);
});

test('renders buttons in order with theme.direction not set to rtl', () => {
  // setting theme.direction to rtl does not change order
  expect.assertions(4);
  const props = {
    modeldata: [],
    rowsPerPage: 10,
    count: 100,
    page: 1,
    onChangePage: () => {},
  };
  render(<RawScoresActions {...props} />);
  const buttons = screen.getAllByRole('button');
  expect(buttons[0]).toHaveAttribute('aria-label', 'First Page');
  expect(buttons[1]).toHaveAttribute('aria-label', 'Previous Page');
  expect(buttons[2]).toHaveAttribute('aria-label', 'Next Page');
  expect(buttons[3]).toHaveAttribute('aria-label', 'Last Page');
});

describe('table pagination', () => {
  it('calls first page button', () => {
    expect.assertions(1);
    const props = {
      modeldata: [],
      rowsPerPage: 10,
      count: 100,
      page: 1,
      onChangePage: jest.fn(),
    };
    render(<RawScoresActions {...props} />);
    userEvent.click(screen.getAllByRole('button')[0]);
    expect(props.onChangePage).toHaveBeenCalledWith(0);
  });
  it('calls back page button', () => {
    expect.assertions(1);
    const props = {
      modeldata: [],
      rowsPerPage: 10,
      count: 100,
      page: 2,
      onChangePage: jest.fn(),
    };
    render(<RawScoresActions {...props} />);
    userEvent.click(screen.getAllByRole('button')[1]);
    expect(props.onChangePage).toHaveBeenCalledWith(1);
  });
  it('calls next page button', () => {
    expect.assertions(1);
    const props = {
      modeldata: [],
      rowsPerPage: 10,
      count: 100,
      page: 1,
      onChangePage: jest.fn(),
    };
    render(<RawScoresActions {...props} />);
    userEvent.click(screen.getAllByRole('button')[2]);
    expect(props.onChangePage).toHaveBeenCalledWith(2);
  });
  it('calls last page button', () => {
    expect.assertions(1);
    const props = {
      modeldata: [],
      rowsPerPage: 10,
      count: 100,
      page: 1,
      onChangePage: jest.fn(),
    };
    render(<RawScoresActions {...props} />);
    userEvent.click(screen.getAllByRole('button')[3]);
    expect(props.onChangePage).toHaveBeenCalledWith(9);
  });
});
