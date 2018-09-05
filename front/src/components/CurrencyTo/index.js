import React from 'react'
import Select from 'react-select';
import Animated from 'react-select/lib/animated';
import { CURRENCIES } from '../../config'

class CurrencyTo extends React.Component {

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
        <h2>...to</h2>
        <div className="form-group">
          <Select
            isMulti
            components={Animated()}
            value={selectedOption}
            onChange={this.handleChange.bind(this)}
            options={CURRENCIES}
          />
        </div>
      </div>
    )
  }
}

export default CurrencyTo