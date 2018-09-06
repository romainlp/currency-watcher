import React from 'react';
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
    switch (currency) {
      case 'AUD':
        return 'au';
      case 'EUR':
        return 'eu';
      case 'GBP':
        return 'gb';
      case 'USD':
        return 'us';
      default:
        return 'eu';
    }
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

const Infos = connect(mapStateToProps)(InfosClass);
export default Infos;
