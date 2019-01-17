// 配置路由
import Home from './containers/Home'
import Login from './containers/Login'
import App from './App'

export default [
  {
    path: '/',
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
        loadData: Home.loadData
      },
      {
        path: '/login',
        exact: true,
        component: Login
      }
    ]
  }
]
