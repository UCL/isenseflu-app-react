import React from 'react';

import { createShallow } from '@material-ui/core/test-utils';

import { RawScores } from './RawScores';
import { Article } from './PublicTemplates';

it('renders RawScoresComponent wihout crashing', () => {
  const props = {
    modeldata: []
  }
  const shallow = createShallow();
  const wrapper = shallow(<RawScores {...props} />);
  expect(wrapper.dive().find(Article)).toHaveLength(1);
});
