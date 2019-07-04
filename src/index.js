import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-clear-sans';
import './index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';
import * as serviceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
//registerServiceWorker();
serviceWorker.unregister();
