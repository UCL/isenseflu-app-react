import React from 'react';
import ReactDOM from 'react-dom';
import ShallowRenderer from 'react-test-renderer/shallow';

import ChartComponent from './Chart';

it('renders ChartComponent without crashing', () => {
  const renderer = new ShallowRenderer();
  const modeldata = {
    parameters: {}
  }
  renderer.render(<ChartComponent modeldata={modeldata}/>);
  const result = renderer.getRenderOutput();
  //expect(result.type).toBe('Article');
  console.log(result.type);
});
