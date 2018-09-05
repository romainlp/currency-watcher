import React, { Component } from 'react'
import Chart from './components/Charts/LineChart/LineChart.js'
import Logo from './components/UI/Logo/Logo.js'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Logo />
        <Chart />
      </div>
    );
  }
}

export default App
