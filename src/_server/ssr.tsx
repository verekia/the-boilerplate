import React from 'react'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import ReactDOMServer from 'react-dom/server'
import serialize from 'serialize-javascript'

import App from '_app/App'
import { staticBaseUrl, bundleUrl } from '_server/server-config'

export const createHtml = (appHtml: string, preloadedState: object) => `<!doctype html>
  <html>
    <head></head>
    <body>
      <div id="app">${appHtml}</div>
    </body>
    <script>
      window.__PRELOADED_STATE__ = ${serialize(preloadedState)}
    </script>
    <script src="${bundleUrl}"></script>
  </html>
`

const store = createStore((s: any) => s, { config: { staticBaseUrl } })

const serverRender = (pageData: Object) =>
  createHtml(
    ReactDOMServer.renderToString(
      <Provider store={store}>
        <App />
      </Provider>,
    ),
    store.getState(),
  )

export default serverRender
