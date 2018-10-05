import React from 'react';
import ReactDOM from 'react-dom';
import AveragesComponent from './Averages';

it('renders About without crashing', () => {
  const div = document.createElement('div');
  const modeldata = {}
  ReactDOM.render(<AveragesComponent modeldata={modeldata}/>, div);
});
