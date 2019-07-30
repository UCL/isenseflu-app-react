import React from 'react';
import ReactDOM from 'react-dom';
import {About, Article, Docs, FormFooter} from './PublicTemplates';

it('renders About without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<About />, div);
});

it('renders Article without crashing', () => {
  const div = document.createElement('div');
  const span = React.createElement('span');
  ReactDOM.render(<Article header="header" children={span} />, div);
});

it('renders Docs without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Docs />, div);
});

it('renders FormFooter without crashing', () => {
  const div = document.createElement('div');
  const span = React.createElement('span');
  ReactDOM.render(<FormFooter children={span} />, div);
});
