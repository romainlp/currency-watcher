import React from 'react'
import {Chart, Line} from 'react-chartjs-2'

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
            gradientStroke.addColorStop(1, "#f49080");
            return {
                datas: {
                    labels: ["d", "d", "d", "", "", "", ""],
                    datasets: [
                        {
                            label: "Australian dollars",
                            borderColor: gradientStroke,
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
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                display: false //this will remove only the label
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
            <div style={{position: 'relative', height: '100vh', width:'100vw'}}>
                <Line ref="linegraph" data={this.state.datas} options={this.state.options} />
            </div>
        )
    }
}

export default LineChart