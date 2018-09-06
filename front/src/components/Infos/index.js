import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlagIcon from '../FlagIcon'; // eslint-disable-line no-unused-vars

import './Infos.scss';

const mapStateToProps = state => ({
  rates: state.rates,
  currencyFrom: state.currencyFrom,
  currencyTo: state.currencyTo,
});

class InfosClass extends React.Component {
  getCountryCodeFromCurrency(currency) {
    if (currency === 'AUD') {
      return 'au';
    }
    if (currency === 'EUR') {
      return 'eu';
    }
    if (currency === 'GBP') {
      return 'gb';
    }
    if (currency === 'USD') {
      return 'us';
    }
    return 'eu';
  }

  render() {
    const countryCodeFrom = this.getCountryCodeFromCurrency(this.props.currencyFrom.value);
    const countryCodeTo = this.getCountryCodeFromCurrency(this.props.currencyTo.value);
    const rate = this.props.rates[0] !== undefined ? this.props.rates[0].rate : '..';
    return (
      <div className="box infos">
        <h2>Informations</h2>
        <div className="currency-group">
          <FlagIcon code={countryCodeFrom} size='3x'/>
          <div className="value">1<span> {this.props.currencyFrom.symbol}</span></div>
        </div>
        <div className="currency-group">
          <FlagIcon code={countryCodeTo} size='3x'/>
          <div className="value">{rate}<span> {this.props.currencyTo.symbol}</span></div>
        </div>
      </div>
    );
  }
}

InfosClass.propTypes = {
  rates: PropTypes.array,
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
const Infos = connect(mapStateToProps)(InfosClass);
export default Infos;
