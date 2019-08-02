import React from 'react';
import { createMount } from '@material-ui/core/test-utils';

import {
  About,
  Article,
  Docs,
  FormFooter,
} from './PublicTemplates';

test('renders About without crashing', () => {
  expect.assertions(1);
  const mount = createMount();
  const wrapper = mount(<About />);
  expect(wrapper.exists()).toBe(true);
  mount.cleanUp();
});

test('renders Article without crashing', () => {
  expect.assertions(1);
  const mount = createMount();
  const span = React.createElement('span');
  const wrapper = mount(<Article header="header">{span}</Article>);
  expect(wrapper.exists()).toBe(true);
  mount.cleanUp();
});

test('renders Docs without crashing', () => {
  expect.assertions(1);
  const mount = createMount();
  const wrapper = mount(<Docs />);
  expect(wrapper.exists()).toBe(true);
  mount.cleanUp();
});

test('renders FormFooter without crashing', () => {
  expect.assertions(1);
  const mount = createMount();
  const span = React.createElement('span');
  const wrapper = mount(<FormFooter>{span}</FormFooter>);
  expect(wrapper.exists()).toBe(true);
  mount.cleanUp();
});
