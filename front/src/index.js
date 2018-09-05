import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store/'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { addRequest } from './actions/index'

window.store = store

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, 
    document.getElementById('root')
)

registerServiceWorker()