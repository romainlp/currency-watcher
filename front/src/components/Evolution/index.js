import React from 'react'
import { connect } from 'react-redux'
import FlagIcon from '../FlagIcon'
import api from '../../api'

import './Evolution.scss'

const mapStateToProps = state => {
  return {
    rates: state.rates,
    currencyFrom: state.currencyFrom,
    currencyTo: state.currencyTo
  };
}


class EvolutionClass extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      day: {},
      week: {},
      month: {},
      year: {}
    }
  }

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

  async componentDidMount () {
    const day = await api.stats().day(
      this.props.currencyFrom.value,
      this.props.currencyTo.value
    )
    this.setState((prevState, props) => {
      return {
        day: day.data
      }
    })
    const week = await api.stats().week(
      this.props.currencyFrom.value,
      this.props.currencyTo.value
    )
    this.setState((prevState, props) => {
      return {
        week: week.data
      }
    })
    const month = await api.stats().month(
      this.props.currencyFrom.value,
      this.props.currencyTo.value
    )
    this.setState((prevState, props) => {
      return {
        month: month.data
      }
    })
    const year = await api.stats().year(
      this.props.currencyFrom.value,
      this.props.currencyTo.value
    )
    this.setState((prevState, props) => {
      return {
        year: year.data
      }
    })
  }

  render () {
    const to = this.props.currencyTo
    let dayStat = parseFloat(this.state.day.diff).toFixed(4) 
    const day = isNaN(dayStat) ? '..' : dayStat
    let weekStat = parseFloat(this.state.week.diff).toFixed(4)
    const week = isNaN(weekStat) ? '..' : weekStat
    let monthStat = parseFloat(this.state.month.diff).toFixed(4)
    const month = isNaN(monthStat) ? '..' : monthStat
    let yearStat = parseFloat(this.state.year.diff).toFixed(4)
    const year = isNaN(yearStat) ? '..' : yearStat
    return (
      <div className="box evolution">
        <h2>Evolution</h2>
        <div className="evolution-group">
          <span className="label">Day</span>
          <div className="value">{day}<span> {to.symbol}</span></div>
        </div>
        <div className="evolution-group">
          <span className="label">Week</span>
          <div className="value">{week}<span> {to.symbol}</span></div>
        </div>
        <div className="evolution-group">
          <span className="label">Month</span>
          <div className="value">{month}<span> {to.symbol}</span></div>
        </div>
        <div className="evolution-group">
          <span className="label">Year</span>
          <div className="value">{year}<span> {to.symbol}</span></div>
        </div>
      </div>
    )
  }
}

const Evolution = connect(mapStateToProps)(EvolutionClass)
export default Evolution