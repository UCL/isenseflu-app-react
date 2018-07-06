import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';

import { NavigationBar } from './NavigationBar';
import { Home, About, Docs } from './PublicTemplates';

class App extends Component {
  render() {
    return (
      <div className="App container pt-2">
        <header className="App-header bg-white">
          <NavigationBar/>
        </header>
        <Router>
          <section className="my-4">
            <Route exact path="/" component={Home}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/docs" component={Docs}/>
          </section>
        </Router>
      </div>
    );
  }
}

export default App;
