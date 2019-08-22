import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from '_app/App'

declare global {
  interface Window {
    __PRELOADED_STATE__: any
    __REDUX_DEVTOOLS_EXTENSION__: any
  }
}

const preloadedState = window.__PRELOADED_STATE__
const { pageData } = preloadedState

const store = createStore(
  s => s,
  preloadedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
)

console.log('Client loaded!')
