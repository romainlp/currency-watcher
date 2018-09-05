import React from 'react'
import Select from 'react-select';
import { connect } from "react-redux";
import { CURRENCIES } from '../../config'
import { setCurrencyFrom } from "../../actions/index"

const mapStateToProps = state => {
  return {
    currencyFrom: state.currencyFrom,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrencyFrom: rates => dispatch(setCurrencyFrom(rates))
  }
}

class CurrencyFromClass extends React.Component {

  handleChange (selectedOption) {
    this.props.setCurrencyFrom(selectedOption);
  }

  render () {
    return (
      <div className="box currency-chooser">
        <h2>From...</h2>
        <div className="form-group">
          <Select
            value={this.props.currencyFrom}
            onChange={this.handleChange.bind(this)}
            options={CURRENCIES}
          />
        </div>
      </div>
    )
  }
}

const CurrencyFrom = connect(mapStateToProps, mapDispatchToProps)(CurrencyFromClass)
export default CurrencyFrom