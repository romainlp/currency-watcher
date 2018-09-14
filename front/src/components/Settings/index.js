import React from 'react';
import Switch from 'react-switch';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setGraph } from '../../store/actions/index';
import './Settings.scss';

const mapStateToProps = state => ({
  rates: state.rates,
  currencyFrom: state.currencyFrom,
  currencyTo: state.currencyTo,
  graph: state.graph
});

const mapDispatchToProps = dispatch => ({
  setGraph: graph => dispatch(setGraph(graph)),
});

class LineChartClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: true,
      week: false,
      month: false,
      year: false,
    }
  }

  // eslint-disable-next-line no-unused-vars
  handleChange = (checked, e, id) => {
    console.log('SET GRAPH', id);
    if (this.state[id] === true) {
      return;
    }
    this.setState({ 
      day: (id === 'day' ? checked : false),
      week: (id === 'week' ? checked : false),
      month: (id === 'month' ? checked : false),
      year: (id === 'year' ? checked : false),
    });
    this.props.setGraph(id);
  }

  render() {
    return (
      <div className="box settings">
        <h2>Show stats for:</h2>
        <div className="form-group">
          <label>Day</label>
          <Switch
            id="day"
            onColor="#5fba7d"
            handleDiameter={18}
            height={24}
            onChange={this.handleChange}
            checked={this.state.day}
            />
        </div>
        <div className="form-group">
          <label>Week</label>
          <Switch
            id="week"
            onColor="#5fba7d"
            handleDiameter={18}
            height={24}
            onChange={this.handleChange}
            checked={this.state.week}
            />
        </div>
        <div className="form-group">
          <label>Month</label>
          <Switch
            id="month"
            onColor="#5fba7d"
            handleDiameter={18}
            height={24}
            onChange={this.handleChange}
            checked={this.state.month}
            />
        </div>
        <div className="form-group">
          <label>Year</label>
          <Switch
            id="year"
            onColor="#5fba7d"
            handleDiameter={18}
            height={24}
            onChange={this.handleChange}
            checked={this.state.year}
            />
        </div>
      </div>
    );
  }
}

LineChartClass.propTypes = {
  setGraph: PropTypes.func,
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
