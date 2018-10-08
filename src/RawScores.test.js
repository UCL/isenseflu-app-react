import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import RawScoresComponent from './DataFiltering';
import {Article} from './PublicTemplates';

it('renders DataFilteringComponent wihout crashing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<RawScoresComponent />);
  const result = renderer.getRenderOutput();
  expect(result.type).toBe(Article);
});
