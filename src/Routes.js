// 配置路由
import App from './App'
import Home from './containers/Home'
import Translation from './containers/Translation'
import NotFound from './containers/NotFound'

export default [
  {
    path: '/',
    component: App,
    loadData: App.loadData,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
        loadData: Home.loadData
      },
      {
        path: '/translation',
        exact: true,
        component: Translation,
        loadData: Translation.loadData
      },
      {
        component: NotFound
      }
    ]
  }
]
