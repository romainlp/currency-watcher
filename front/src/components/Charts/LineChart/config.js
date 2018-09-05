/**
 * LineChart base configuration
 */
export default {
  timer: null,
  counter: 0,
  datas: {},
  options: {
    animation: {
      duration: 1000,
      easing: 'easeInOutCubic'
    },
    responsive: true,
    responsiveAnimationDuration: 500,
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