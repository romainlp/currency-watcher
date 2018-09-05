import React from 'react'
import { connect } from "react-redux";
import { Chart, Line } from 'react-chartjs-2'
import axios from 'axios'
import moment from 'moment'
import { setRates } from "../../../actions/index"

import './LineChart.scss'

const mapStateToProps = state => {
  return {
    rates: state.rates,
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
    this.state = {
      timer: null,
      counter: 0,
      datas: {},
      options: {
        animation: false,
        responsive: true,
        responsiveAnimationDuration: 0,
        maintainAspectRatio: false,
        scaleFontSize: 0,
        layout: {
          padding: {
            left: -10,
            bottom: -10
          }
        },
        title: {
          display: true
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            ticks: {
              display: false,
            },
            gridLines: {
              color: "rgba(255, 255, 255, 0)",
            }
          }],
          yAxes: [{
            ticks: {
              display: false,
              min: 0.6185,
              max: 0.6205
            },
            gridLines: {
              color: "rgba(255, 255, 255, 0)",
            }
          }],
        }
      }
    }
    Chart.defaults.global.legend.display = false
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    const gradientStroke = this.refs.linegraph.chartInstance.ctx.createLinearGradient(0, 0, 800, 800)
      gradientStroke.addColorStop(0, "#80b6f4");
      gradientStroke.addColorStop(1, "#FFF");

    if (this.props.rates !== prevProps.rates) {
      let labels = this.props.rates.map(x => x.date)
      labels = labels.map(x => new moment(x).fromNow())

      const datasets = [];
      Object.keys(this.props.rates).forEach((currency) => {
        let dataset = {
          label: currency,
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
    let response = await axios.get('http://127.0.0.1:3000/rates/AUD/EUR/15')
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