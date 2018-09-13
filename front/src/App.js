import React, { Component } from 'react';
import GithubCorner from 'react-github-corner';
import LineChart from './components/Charts/LineChart';
import Switcher from './components/Switcher';
import Evolution from './components/Evolution';
import Navigation from './components/Navigation';

import './assets/scss/base.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GithubCorner
          octoColor="#6e90f6"
          bannerColor="#fff"
          href="https://github.com/romainlp/currency-watcher" />
        <div className="head">
          <Navigation />
          <LineChart />
        </div>
        <div className="container">
          <Switcher />
          <div className="row">
            <div className="col-4">
              <Evolution />
            </div>
            <div className="col-8">
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
