import React from 'react'
import Select from 'react-select';
import { CURRENCIES } from '../../config'

class CurrencyFrom extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      selectedOption: null,
    }
  }

  handleChange (selectedOption) {
    this.setState({ selectedOption });
  }

  render () {
    const { selectedOption } = this.state;
    return (
      <div className="box currency-chooser">
        <h2>From...</h2>
        <div className="form-group">
          <Select
            value={selectedOption}
            onChange={this.handleChange.bind(this)}
            options={CURRENCIES}
          />
        </div>
      </div>
    )
  }
}

export default CurrencyFrom