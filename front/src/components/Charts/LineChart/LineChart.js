import React from 'react'
import { connect } from 'react-redux'
import { Chart, Line } from 'react-chartjs-2'
import moment from 'moment'
import { setRates } from '../../../store/actions/index'
import api from '../../../api'

import FlagIconFactory from 'react-flag-icon-css'

import chartConfig from './config.js'
import './LineChart.scss'

const mapStateToProps = state => {
  return {
    rates: state.rates,
    currencyFrom: state.currencyFrom,
    currencyTo: state.currencyTo
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setRates: rates => dispatch(setRates(rates))
  }
}

class LineChartClass extends React.Component {

  constructor (props) {
    super(props)
    this.state = chartConfig
    Chart.defaults.global.legend.display = false
  }

  componentDidUpdate (prevProps, prevState, snapshot) {

    if (this.props.currencyFrom !== prevProps.currencyFrom) {
      this.loadData()
    }

    if (this.props.currencyTo !== prevProps.currencyTo) {
      this.loadData()
    }

    if (this.props.rates !== prevProps.rates) {
      const gradientStroke = this.refs.linegraph.chartInstance.ctx.createLinearGradient(0, 0, 800, 800)
      gradientStroke.addColorStop(0, "#80b6f4");
      gradientStroke.addColorStop(1, "#FFF");

      let labels = this.props.rates.map(x => x.date)
      labels = labels.map(x => new moment(x).fromNow())

      const datasets = [];
      Object.keys(this.props.rates).forEach((currency) => {
        let dataset = {
          label: this.props.currencyTo.label,
          borderColor: gradientStroke,
          backgroundColor: 'transparent',
          data: this.props.rates.map(x => parseFloat(x.rate).toFixed(4)).reverse()
        }
        datasets.push(dataset)
      })

      this.setState((prevState, props) => {
        return {
          datas: {
            labels: labels.reverse(),
            datasets: datasets
          },
        }
      })
    }
  }

  async loadData () {

    let response = await api.rates().get(
      this.props.currencyFrom.value,
      this.props.currencyTo.value,
      15
    )

    if (response.status == 200) {
      this.props.setRates(response.data.rates)
      this.setState((prevState, props) => {
        return {
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  min: parseFloat(response.data.min) - 0.0002,
                  max: parseFloat(response.data.max) + 0.0002
                }
              }]
            }
          },
        }
      })
    }
  }

  componentDidMount () {
    this.loadData()
    let timer = setInterval(this.loadData.bind(this), 60000)
    this.setState({timer})
  }

  componentWillUnmount () {
    this.clearInterval(this.state.timer)
  }

  render () {
    return (
      <div className="chart line-chart" style={{position: 'relative', height: '60vh', width:'100vw'}}>
        <Line ref="linegraph" data={this.state.datas} options={this.state.options} />
      </div>
    )
  }
}

const LineChart = connect(mapStateToProps, mapDispatchToProps)(LineChartClass)
export default LineChart