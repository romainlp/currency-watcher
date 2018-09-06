import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CURRENCIES } from '../../config';
import { setCurrencyTo } from '../../store/actions/index';

const mapStateToProps = state => ({
  currencyTo: state.currencyTo,
  currencyFrom: state.currencyFrom,
});

const mapDispatchToProps = dispatch => ({
  setCurrencyTo: currency => dispatch(setCurrencyTo(currency)),
});

class CurrencyToClass extends React.Component {
  handleChange(selectedOption) {
    this.props.setCurrencyTo(selectedOption);
  }

  render() {
    const currencies = CURRENCIES
      .filter(currency => currency.value !== this.props.currencyFrom.value);
    return (
      <div className="currency-chooser">
        <div className="form-group">
          <Select
            className="select"
            value={this.props.currencyTo}
            onChange={this.handleChange.bind(this)}
            options={currencies}
          />
        </div>
      </div>
    );
  }
}

CurrencyToClass.propTypes = {
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
};
const defaultCurrency = CURRENCIES[1];
CurrencyToClass.defaultProps = defaultCurrency;
const CurrencyTo = connect(mapStateToProps, mapDispatchToProps)(CurrencyToClass);
export default CurrencyTo;
