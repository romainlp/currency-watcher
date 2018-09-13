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

  async componentDidMount() {
    this.loadData();
    const timer = setInterval(this.loadData.bind(this), (1000 * 60) * 5);
    this.setState({ timer });
  }

  componentWillUnmount() {
    this.clearInterval(this.state.timer);
  }

  async loadData() {
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

    this.setState({
      loading: false
    })
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

    return (
      <div className={"box evolution " + (this.state.loading ? 'loading' : 'ready')}>
        <h2>Evolution</h2>
        <div className="evolution-group">
          <span className="label">Day</span>
          <div className="value">
            {dayStat}
            <span>
              {currencyTo.symbol}
              <FontAwesomeIcon icon={iconDay} />
            </span>
          </div>
        </div>
        <div className="evolution-group">
          <span className="label">Week</span>
          <div className="value">
            {weekStat}
            <span>
              {currencyTo.symbol}
              <FontAwesomeIcon icon={iconWeek} />
            </span>
          </div>
        </div>
        <div className="evolution-group">
          <span className="label">Month</span>
          <div className="value">
            {monthStat}
            <span>
              {currencyTo.symbol}
              <FontAwesomeIcon icon={iconMonth} />
            </span>
          </div>
        </div>
        <div className="evolution-group">
          <span className="label">Year</span>
          <div className="value">
            {yearStat}
            <span>
              {currencyTo.symbol}
              <FontAwesomeIcon icon={iconYear} />
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
