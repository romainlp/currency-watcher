import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Chart, Line } from 'react-chartjs-2';
import Moment from 'moment';
import { setRates } from '../../../store/actions/index';
import api from '../../../api';

import chartConfig from './config';
import './LineChart.scss';

const mapStateToProps = state => ({
  rates: state.rates,
  currencyFrom: state.currencyFrom,
  currencyTo: state.currencyTo,
  graph: state.graph,
});

const mapDispatchToProps = dispatch => ({
  setRates: rates => dispatch(setRates(rates)),
});

class LineChartClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = chartConfig;
    this.lineChart = React.createRef();
    Chart.defaults.global.legend.display = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.loadData();
    const intervalId = setInterval(this.loadData.bind(this), (1000 * 60) * 5);
    this.setState({ intervalId: intervalId });
  }

  componentDidUpdate(prevProps) {
    if (this.props.currencyFrom !== prevProps.currencyFrom) {
      this.loadData(this.props.graph);
    }

    if (this.props.currencyTo !== prevProps.currencyTo) {
      this.loadData(this.props.graph);
    }

    if (this.props.graph !== prevProps.graph) {
      this.loadData(this.props.graph);
    }

    if (this.props.rates !== prevProps.rates) {
      const { rates } = this.props
      let labels = rates.map(x => x.date);
      labels = labels.map(x => new Moment(x).fromNow());

      const datasets = [];
      Object.keys(this.props.rates).forEach(() => {
        const dataset = {
          label: '1',
          borderColor: 'rgba(255, 255, 255, 0.5)',
          backgroundColor: 'transparent',
          data: this.props.rates.map(x => parseFloat(x.rate).toFixed(4)).reverse(),
          pointBackgroundColor: '#FFF',
          pointBorderColor: '#FFF',
          pointBorderWidth: 6,
          pointHoverBackgroundColor: '#FFF',
          pointHoverBorderColor: '#FFF',
        };
        datasets.push(dataset);
      });

      this.setState({
        datas: {
          labels: labels.reverse(),
          datasets,
        },
      });
    }
  }

  loadData = async (type) => {
    let response = undefined;
    if (type === undefined) {
      response = await api.rates().get(
        this.props.currencyFrom.value,
        this.props.currencyTo.value,
        15,
      );
    }

    if (type === 'week') {
      response = await api.rates().week(
        this.props.currencyFrom.value,
        this.props.currencyTo.value,
        15,
      );
    }

    if (type === 'month') {
      response = await api.rates().month(
        this.props.currencyFrom.value,
        this.props.currencyTo.value,
        15,
      );
    }

    if (type === 'year') {
      response = await api.rates().month(
        this.props.currencyFrom.value,
        this.props.currencyTo.value,
        15,
      );
    }

    if (response.status === 200 && this._isMounted) {
      this.props.setRates(response.data.rates);
      this.setState({
        options: {
          scales: {
            yAxes: [{
              ticks: {
                min: parseFloat(response.data.min) - 0.0002,
                max: parseFloat(response.data.max) + 0.0002,
              },
            }],
          },
        },
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
    this._isMounted = false;
  }

  render() {
    return (
      <div className="chart line-chart">
        <Line ref={this.lineChart} data={this.state.datas} options={this.state.options} />
      </div>
    );
  }
}

LineChartClass.propTypes = {
  setRates: PropTypes.func,
  rates: PropTypes.array,
  graph: PropTypes.string,
  currencyTo: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
    symbol: PropTypes.string,
  }),
  currencyFrom: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
    symbol: PropTypes.string,
  }),
  setCurrencyTo: PropTypes.func,
  setCurrencyFrom: PropTypes.func,
};
const LineChart = connect(mapStateToProps, mapDispatchToProps)(LineChartClass);
export default LineChart;
