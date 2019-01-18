import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import { renderToString } from 'react-dom/server'

export const render = (store, routes, req, context) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <div>{renderRoutes(routes)}</div>
      </StaticRouter>
    </Provider>
  )

  const cssStr = context.css.length ? context.css.join('\n') : '';

  return `
      <html>
        <head>
          <title>SSR</title>
          <style>${cssStr}</style>
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
