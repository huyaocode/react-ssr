import React from 'react'
import { StaticRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'

export const render = (store, routes, req) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={{}}>
        <Switch>
          {routes.map(route => (
            <Route key={route.path} {...route} />
          ))}
        </Switch>
      </StaticRouter>
    </Provider>
  )

    return `
      <html>
        <head>
          <title>SSR</title>
        </head>
        <body>
          <div id="root">${content}</div>
          <script>
            window.context = {
              state: ${JSON.stringify(store.getState())}
            }
          </script>
          <script src='/index.js'></script>
        </body>
      </html>
    `
}
