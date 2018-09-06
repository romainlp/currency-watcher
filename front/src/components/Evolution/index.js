import React from 'react'
import { connect } from 'react-redux'
import FlagIcon from '../FlagIcon'

import './Evolution.scss'

const mapStateToProps = state => {
  return {
    rates: state.rates,
    currencyFrom: state.currencyFrom,
    currencyTo: state.currencyTo
  };
}


class EvolutionClass extends React.Component {

  getCountryCodeFromCurrency (currency) {
    switch (currency) {
      case 'AUD':
        return 'au'
        break
      case 'EUR':
        return 'eu'
        break
      case 'GBP':
        return 'gb'
        break
      case 'USD':
        return 'us'
        break
      default:
        return 'eu'
    }
  }

  render () {
    const length = this.props.rates.length
    const countryCodeFrom = this.getCountryCodeFromCurrency(this.props.currencyFrom.value)
    const countryCodeTo = this.getCountryCodeFromCurrency(this.props.currencyTo.value)
    const rate = this.props.rates[0] != undefined ? this.props.rates[0].rate : '..';
    return (
      <div className="box evolution">
        <h2>Evolution</h2>
        <div className="evolution-group">
          <span className="label">Last 24h</span>
          <span className="value">+0.3%</span>
        </div>
        <div className="evolution-group">
          <span className="label">Last week</span>
          <span className="value">+0.2%</span>
        </div>
        <div className="evolution-group">
          <span className="label">Last month</span>
          <span className="value">-0.4%</span>
        </div>
      </div>
    )
  }
}

const Evolution = connect(mapStateToProps)(EvolutionClass)
export default Evolution