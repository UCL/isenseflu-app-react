/* eslint react/jsx-props-no-spreading: "off" */
import React from 'react';

import { createShallow } from '@material-ui/core/test-utils';

import RawScoresActions from './RawScoresActions';

test('renders RawScoresActions wihout crashing', () => {
  expect.assertions(2);
  const props = {
    modeldata: [],
    rowsPerPage: 10,
    count: 100,
    page: 1,
    onChangePage: () => {},
  };
  const shallow = createShallow();
  const wrapper = shallow(<RawScoresActions {...props} />);
  expect(wrapper.dive().type()).toBe('div');
  expect(wrapper.dive().children()).toHaveLength(4);
});

test('renders with theme.direction set to rtl', () => {
  expect.assertions(6);
  const props = {
    modeldata: [],
    rowsPerPage: 10,
    count: 100,
    page: 1,
    onChangePage: () => {},
    theme: { direction: 'rtl' },
  };
  const shallow = createShallow({ dive: true });
  const wrapper = shallow(<RawScoresActions {...props} />);
  expect(wrapper.type()).toBe('div');
  expect(wrapper.children()).toHaveLength(4);
  expect(wrapper.childAt(0).find('LastPageIcon').exists()).toBe(true);
  expect(wrapper.childAt(1).find('KeyboardArrowRightIcon').exists()).toBe(true);
  expect(wrapper.childAt(2).find('KeyboardArrowLeftIcon').exists()).toBe(true);
  expect(wrapper.childAt(3).find('FirstPageIcon').exists()).toBe(true);
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
    const shallow = createShallow();
    const wrapper = shallow(<RawScoresActions {...props} />);
    const instance = wrapper.dive().instance();
    instance.handleFirstPageButtonClick();
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
    const shallow = createShallow();
    const wrapper = shallow(<RawScoresActions {...props} />);
    const instance = wrapper.dive().instance();
    instance.handleBackButtonClick();
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
    const shallow = createShallow();
    const wrapper = shallow(<RawScoresActions {...props} />);
    const instance = wrapper.dive().instance();
    instance.handleNextButtonClick();
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
    const shallow = createShallow();
    const wrapper = shallow(<RawScoresActions {...props} />);
    const instance = wrapper.dive().instance();
    instance.handleLastPageButtonClick();
    expect(props.onChangePage).toHaveBeenCalledWith(9);
  });
});
