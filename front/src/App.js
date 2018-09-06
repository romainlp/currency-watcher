import React, { Component } from 'react'
import Chart from './components/Charts/LineChart/LineChart.js'
import CurrencyFrom from './components/CurrencyFrom'
import CurrencyTo from './components/CurrencyTo'
import Infos from './components/Infos'
import Evolution from './components/Evolution'
import Navigation from './components/Navigation'
import GithubCorner from 'react-github-corner'

import './assets/scss/base.scss'

class App extends Component {
  render() {
    return (
      <div className="App">
        <GithubCorner 
          style={{'zIndex': 30, 'position': 'absolute', 'right': 0}} 
          octoColor="#6e90f6"
          bannerColor="#fff"
          href="https://github.com/romainlp/currency-watcher" />
        <div className="head">
          <Navigation />
          <Chart />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-4">
              <div className="box">
                <CurrencyFrom />
                <CurrencyTo />
              </div>
            </div>
            <div className="col-4">
              <Infos />
            </div>
            <div className="col-4">
              <Evolution />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App
