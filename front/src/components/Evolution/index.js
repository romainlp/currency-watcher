import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CURRENCIES } from '../../config';
import api from '../../api';

import './Evolution.scss';

const mapStateToProps = state => ({
  rates: state.rates,
  currencyFrom: state.currencyFrom,
  currencyTo: state.currencyTo,
});


class EvolutionClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: {},
      week: {},
      month: {},
      year: {},
    };
  }

  async componentDidMount() {
    const { currencyFrom, currencyTo } = this.props;

    const day = await api.stats().day(
      currencyFrom.value,
      currencyTo.value,
    );
    this.setState({
      day: day.data,
    });
    const week = await api.stats().week(
      currencyFrom.value,
      currencyTo.value,
    );
    this.setState({
      week: week.data,
    });
    const month = await api.stats().month(
      currencyFrom.value,
      currencyTo.value,
    );
    this.setState({
      month: month.data,
    });
    const year = await api.stats().year(
      currencyFrom.value,
      currencyTo.value,
    );
    this.setState({
      year: year.data,
    });
  }

  render() {
    const { currencyTo } = this.props;
    const {
      day,
      month,
      week,
      year,
    } = this.state;
    const dayStat = parseFloat(day.diff).toFixed(4);
    const weekStat = parseFloat(week.diff).toFixed(4);
    const monthStat = parseFloat(month.diff).toFixed(4);
    const yearStat = parseFloat(year.diff).toFixed(4);

    return (
      <div className="box evolution">
        <h2>Evolution</h2>
        <div className="evolution-group">
          <span className="label">Day</span>
          <div className="value">
            {dayStat}
            <span>
              {currencyTo.symbol}
            </span>
          </div>
        </div>
        <div className="evolution-group">
          <span className="label">Week</span>
          <div className="value">
            {weekStat}
            <span>
              {currencyTo.symbol}
            </span>
          </div>
        </div>
        <div className="evolution-group">
          <span className="label">Month</span>
          <div className="value">
            {monthStat}
            <span>
              {currencyTo.symbol}
            </span>
          </div>
        </div>
        <div className="evolution-group">
          <span className="label">Year</span>
          <div className="value">
            {yearStat}
            <span>
              {currencyTo.symbol}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
EvolutionClass.propTypes = {
  currencyTo: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
    symbol: PropTypes.string,
  }),
};
const defaultCurrency = CURRENCIES[0];
EvolutionClass.defaultProps = defaultCurrency;
const Evolution = connect(mapStateToProps)(EvolutionClass);
export default Evolution;
