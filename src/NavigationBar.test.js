import React from 'react';
import ReactDOM from 'react-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import {Navbar} from 'reactstrap';

import {NavigationBar} from './NavigationBar';
import {Article} from './PublicTemplates';

it('renders DataFilteringComponent wihout crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NavigationBar />, div);
});
