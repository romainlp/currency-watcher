import React, { Component } from 'react'
import Chart from './components/Charts/LineChart/LineChart.js'
import Logo from './components/UI/Logo/Logo.js'
import CurrencyFrom from './components/CurrencyFrom'
import CurrencyTo from './components/CurrencyTo'

import './assets/scss/base.scss'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="head">
          <Logo />
          <Chart />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <CurrencyFrom />
            </div>
            <div className="col-6">
              <CurrencyTo />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App
