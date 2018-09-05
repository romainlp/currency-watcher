import React from 'react'
import Select from 'react-select';
import { connect } from "react-redux";
import { CURRENCIES } from '../../config'
import { setCurrencyTo } from "../../actions/index"

const mapStateToProps = state => {
  return {
    currencyTo: state.currencyTo,
    currencyFrom: state.currencyFrom
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrencyTo: currency => dispatch(setCurrencyTo(currency))
  }
}

class CurrencyToClass extends React.Component {

  handleChange (selectedOption) {
    this.props.setCurrencyTo(selectedOption);
  }

  render () {
    const currencies = CURRENCIES.filter(currency => currency.value != this.props.currencyFrom.value)
    return (
      <div className=" currency-chooser">
        <h2>...to</h2>
        <div className="form-group">
          <Select
            value={this.props.currencyTo}
            onChange={this.handleChange.bind(this)}
            options={currencies}
          />
        </div>
      </div>
    )
  }
}

const CurrencyTo = connect(mapStateToProps, mapDispatchToProps)(CurrencyToClass)
export default CurrencyTo