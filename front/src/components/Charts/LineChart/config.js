/**
 * LineChart base configuration
 */
export default {
  timer: null,
  counter: 0,
  datas: {},
  options: {
    showAllTooltips: true,
    animation: {
      duration: 1000,
      easing: 'easeInOutCubic',
    },
    responsive: true,
    responsiveAnimationDuration: 500,
    maintainAspectRatio: false,
    scaleFontSize: 0,
    layout: {
      padding: {
        left: 40,
        bottom: -10,
        right: 40,
      },
    },
    title: {
      display: true,
    },
    legend: {
      display: false,
    },
    tooltips: {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      titleFontSize: 0,
      titleMarginBottom: 0,
      bodyFontSize: 10,
      bodyFontColor: '#33b1f8',
      displayColors: false,
      caretPadding: 10,
      callbacks: {
        label(tooltipItem, data) {
          return tooltipItem.yLabel;
        },
      },
    },
    scales: {
      xAxes: [{
        ticks: {
          display: false,
        },
        gridLines: {
          color: 'rgba(255, 255, 255, 0)',
        },
      }],
      yAxes: [{
        ticks: {
          display: false,
          min: 0.6185,
          max: 0.6205,
        },
        gridLines: {
          color: 'rgba(255, 255, 255, 0)',
        },
      }],
    },
  },
};
