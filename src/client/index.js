import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import routes from '../Routes'
import { getClientStore } from '../store'

const store = getClientStore();

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        {routes.map(route => (
          <Route key={route.path} {...route} />
        ))}
      </Switch>
    </BrowserRouter>
  </Provider>
)

ReactDom.hydrate(<App />, document.getElementById('root'))
