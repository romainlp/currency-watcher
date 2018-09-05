import React from 'react'
import {Chart, Line} from 'react-chartjs-2'
import './LineChart.scss'

class LineChart extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      datas: {},
      options: {}
    }
    Chart.defaults.global.legend.display = false
  }

  componentDidMount() {
    this.setState((prevState, props) => {
      let gradientStroke = this.refs.linegraph.chartInstance.ctx.createLinearGradient(0, 0, 800, 800)
      gradientStroke.addColorStop(0, "#80b6f4");
      gradientStroke.addColorStop(1, "#FFF");
      return {
        datas: {
          labels: ["d", "d", "d", "", "", "", ""],
          datasets: [
            {
              label: "Australian dollars",
              borderColor: gradientStroke,
              backgroundColor: 'transparent',
              data: [0.6212, 0.6214, 0.6218, 0.6218, 0.6219, 0.6218, 0.6221]
            }
          ]
        },
        options: {
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
                display: false //this will remove only the label
              },
              gridLines: {
                color: "rgba(255, 255, 255, 0.03)",
              }
            }],
            yAxes: [{
              ticks: {
                display: false //this will remove only the label
              },
              gridLines: {
                color: "rgba(255, 255, 255, 0.03)",
              }
            }],
          }
        }
      }
    })
  }

  componentDidUpdate() {
    console.log('Component did update')
  }

  componentWillUnmount() {
    console.log('Component will unmount')
  }

  render () {
    return (
      <div className="chart line-chart" style={{position: 'relative', height: '60vh', width:'100vw'}}>
        <Line ref="linegraph" data={this.state.datas} options={this.state.options} />
      </div>
    )
  }
}

export default LineChart