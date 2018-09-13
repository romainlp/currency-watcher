import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import FlagIcon from '../FlagIcon';
import { connect } from 'react-redux';
import { CURRENCIES } from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { setCurrencyTo, setCurrencyFrom } from '../../store/actions/index';
import './Switcher.scss';

const mapStateToProps = state => ({
  rates: state.rates,
  currencyTo: state.currencyTo,
  currencyFrom: state.currencyFrom,
});

const mapDispatchToProps = dispatch => ({
  setCurrencyTo: currency => dispatch(setCurrencyTo(currency)),
  setCurrencyFrom: currency => dispatch(setCurrencyFrom(currency)),
});

class SwitcherClass extends React.Component {
  invertCurrencies = () => {
    let currency = this.props.currencyFrom
    this.props.setCurrencyFrom(this.props.currencyTo)
    this.props.setCurrencyTo(currency)
  }

  render() {
    const currencyTo = FlagIcon.getCountryCodeFromCurrency(this.props.currencyTo.value);
    const currencyFrom = FlagIcon.getCountryCodeFromCurrency(this.props.currencyFrom.value);
    const rate = this.props.rates[0] !== undefined ? this.props.rates[0].rate : '..';
    return (
      <div className="row switcher">
        <div className="col-12">
          <div className="container">
            <div className="row">
              <div className="col-5 col-12-sm currency-from">
                <div className="select-wrapper">
                  <FlagIcon code={currencyFrom} size='3x'/>
                  <Select
                    className="select"
                    value={this.props.currencyFrom}
                    onChange={this.props.setCurrencyFrom}
                    options={CURRENCIES
                      .filter(currency => currency.value !== this.props.currencyFrom.value)}
                  />
                </div>
                <div className="currency-value">
                  <p className="value">1<span> {this.props.currencyFrom.symbol}</span></p>
                </div>
              </div>
              <div className="col-2 col-12-sm invert" title="Invert selection">
                <button onClick={this.invertCurrencies}>
                  <FontAwesomeIcon icon={faExchangeAlt} />
                </button>
              </div>
              <div className="col-5 col-12-sm currency-to">
                <div className="select-wrapper">
                  <FlagIcon code={currencyTo} size='3x'/>
                  <Select
                    className="select"
                    value={this.props.currencyTo}
                    onChange={this.props.setCurrencyTo}
                    options={CURRENCIES
                      .filter(currency => currency.value !== this.props.currencyTo.value)}
                  />
                </div>
                <div className="currency-value">
                  <p className="value">{rate}<span> {this.props.currencyTo.symbol}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SwitcherClass.propTypes = {
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
  setCurrencyFrom: PropTypes.func
};
const defaultCurrency = CURRENCIES[1];
SwitcherClass.defaultProps = defaultCurrency;
const Switcher = connect(mapStateToProps, mapDispatchToProps)(SwitcherClass);
export default Switcher;
