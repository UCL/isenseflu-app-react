import React from 'react';
import { createMount } from '@material-ui/core/test-utils';

import {
  Article,
  FormFooter,
} from './PublicTemplates';

test('renders Article without crashing', () => {
  expect.assertions(1);
  const mount = createMount();
  const span = React.createElement('span');
  const wrapper = mount(<Article header="header">{span}</Article>);
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
