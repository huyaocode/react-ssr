import express from 'express'
import proxy from 'express-http-proxy'
import { matchRoutes } from 'react-router-config'
import routes from '../Routes'
import { render } from './utils'
import { getStore } from '../store'

//因为webpack支持ES Module，所以可以改写为import这种形式，但是编译完成后还是使用的require()这种语法
const app = express()
//只要express发现请求了一个静态资源文件，那么express就会帮你去‘/public’下找

//接口代理转发
app.use(
  '/api',
  proxy('http://localhost:8899', {
    proxyReqPathResolver: function( req ) {
      return '/api' + req.url;
    }
  })
)

app.use(express.static('public'))

app.get('*', function(req, res) {
  const store = getStore(req)
  //在这里能拿到异步数据，并填充到store中，就可以做到SSR异步请求的渲染
  // store中填充的内容还需要结合当前用户请求地址和路由做判断
  // 如果用户访问 / 路径，我们就拿home组件的异步数据
  // 如果访问 login 路径，我们就拿 login组件的异步数据

  // 根据路由的路径，来往store里面加数据
  const matchedRoutes = matchRoutes(routes, req.path)
  //让matchRoutes里面所有的组件，对应的loadData方法执行一次
  const promises = []
  matchedRoutes.forEach(item => {
    if (item.route.loadData) {
      const promise = new Promise((resolve, reject) => {
        item.route.loadData(store).then(resolve).catch(resolve)
      })
      promises.push(promise);
    }
  })

  Promise.all(promises).then(() => {
    const context = {css:[]};
    const html = render(store, routes, req, context)
    
    //重定向
    if(context.action === 'REPLACE') {
      res.redirect(301, context.url)
    }
    // 404 页面设置状态码
    else if(context.NOT_FOUND) {
      res.status(404);
    }
    
    res.send(html)
  })
})

const server = app.listen(3000)
