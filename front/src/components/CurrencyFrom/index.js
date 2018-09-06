import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CURRENCIES } from '../../config';
import { setCurrencyFrom, setCurrencyTo } from '../../store/actions/index';

const mapStateToProps = state => ({
  currencyFrom: state.currencyFrom,
});

const mapDispatchToProps = dispatch => ({
  setCurrencyFrom: currency => dispatch(setCurrencyFrom(currency)),
  setCurrencyTo: currency => dispatch(setCurrencyTo(currency)),
});

class CurrencyFromClass extends React.Component {
  handleChange(selectedOption) {
    this.props.setCurrencyFrom(selectedOption);
    const currencies = CURRENCIES.filter(currency => currency.value !== selectedOption.value);
    this.props.setCurrencyTo(currencies[0]);
  }

  render() {
    return (
      <div className="currency-chooser">
        <h2>Currency</h2>
        <div className="form-group">
          <Select
            className="select"
            value={this.props.currencyFrom}
            onChange={this.handleChange.bind(this)}
            options={CURRENCIES}
          />
        </div>
      </div>
    );
  }
}

CurrencyFromClass.propTypes = {
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
const CurrencyFrom = connect(mapStateToProps, mapDispatchToProps)(CurrencyFromClass);
export default CurrencyFrom;
