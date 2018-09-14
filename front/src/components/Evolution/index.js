import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CURRENCIES } from '../../config';
import api from '../../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleUp, faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';

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
      loading: true
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.currencyFrom !== prevProps.currencyFrom) {
      this.loadData();
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.loadData();
    let intervalId = setInterval(this.loadData, 500 /*(1000 * 60) * 5*/);
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.state.intervalId);
  }

  loadData = async () => {
    const { currencyFrom, currencyTo } = this.props;
    const day = await api.stats().day(
      currencyFrom.value,
      currencyTo.value,
    );
    const week = await api.stats().week(
      currencyFrom.value,
      currencyTo.value,
    );
    const month = await api.stats().month(
      currencyFrom.value,
      currencyTo.value,
    );
    const year = await api.stats().year(
      currencyFrom.value,
      currencyTo.value,
    );
    if (this._isMounted) {
      this.setState({
        month: month.data,
        week: week.data,
        day: day.data,
        year: year.data,
        loading: false,
      })
    }
  }

  render() {
    const { currencyTo } = this.props;
    const {
      day,
      month,
      week,
      year,
    } = this.state;

    let dayStat = parseFloat(day.diff).toFixed(4);
    let weekStat = parseFloat(week.diff).toFixed(4);
    let monthStat = parseFloat(month.diff).toFixed(4);
    let yearStat = parseFloat(year.diff).toFixed(4);

    dayStat = (dayStat > 0 ? '+' + dayStat : dayStat);
    weekStat = (weekStat > 0 ? '+' + weekStat : weekStat);
    monthStat = (monthStat > 0 ? '+' + monthStat : monthStat);
    yearStat = (yearStat > 0 ? '+' + yearStat : yearStat);

    const iconDay = (dayStat > 0 ? faArrowCircleUp : faArrowCircleDown);
    const iconWeek = (weekStat > 0 ? faArrowCircleUp : faArrowCircleDown);
    const iconMonth = (monthStat > 0 ? faArrowCircleUp : faArrowCircleDown);
    const iconYear = (yearStat > 0 ? faArrowCircleUp : faArrowCircleDown);

    const dayClassName =  (dayStat > 0 ? 'pos' : 'neg');
    const weekClassName =  (weekStat > 0 ? 'pos' : 'neg');
    const monthClassName =  (monthStat > 0 ? 'pos' : 'neg');
    const yearClassName =  (yearStat > 0 ? 'pos' : 'neg');

    return (
      <div className={"box evolution " + (this.state.loading ? 'loading' : 'ready')}>
        <h2>Evolution</h2>
        <div className="evolution-group">
          <span className="label">Day</span>
          <div className="value">
            {dayStat}
            <div>
              {currencyTo.symbol}
              <span className={dayClassName}>
                <FontAwesomeIcon icon={iconDay} />
              </span>
            </div>
          </div>
        </div>
        <div className="evolution-group">
          <span className="label">Week</span>
          <div className="value">
            {weekStat}
            <div>
              {currencyTo.symbol}
              <span className={weekClassName}>
                <FontAwesomeIcon icon={iconWeek} />
              </span>
            </div>
          </div>
        </div>
        <div className="evolution-group">
          <span className="label">Month</span>
          <div className="value">
            {monthStat}
            <div>
              {currencyTo.symbol}
              <span className={monthClassName}>
                <FontAwesomeIcon icon={iconMonth} />
              </span>
            </div>
          </div>
        </div>
        <div className="evolution-group">
          <span className="label">Year</span>
          <div className="value">
            {yearStat}
            <div>
              {currencyTo.symbol}
              <span className={yearClassName}>
                <FontAwesomeIcon icon={iconYear} />
              </span>
            </div>
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
  currencyFrom: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
    symbol: PropTypes.string,
  }),
  loading: PropTypes.bool
};
const defaultCurrency = CURRENCIES[0];
EvolutionClass.defaultProps = defaultCurrency;
const Evolution = connect(mapStateToProps)(EvolutionClass);
export default Evolution;
