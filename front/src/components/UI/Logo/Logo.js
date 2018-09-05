import React from 'react'
import './Logo.css'

class Logo extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('Component did mount')
  }

  componentDidUpdate() {
    console.log('Component did update')
  }

  componentWillUnmount() {
    console.log('Component will unmount')
  }

  render () {
    return (
      <div className="logo">
        <h1>Currency Watcher</h1>
      </div>
    )
  }
}

export default Logo