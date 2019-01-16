# react-ssr
react服务端渲染


### 客户端渲染与服务端渲染
客户端渲染即普通的React项目渲染方式。
客户端渲染流程：
1. 浏览器发送请求
2. 服务器返回HTML
3. 浏览器发送bundle.js请求
4. 服务器返回bundle.js
5. 浏览器执行bundle.js中的React代码

CSR带来的问题：
1. 首屏加载时间过长
2. SEO 不友好

因为时间在往返的几次网络请求中就耽搁了，而且因为CSR返回到页面的HTML中没有内容，就只有一个root空元素，页面内容是靠js渲染出来的，爬虫在读取网页时就抓不到信息，所以SEO不友好

SSR带来的问题：
1. React代码在服务器端执行，很大的消耗了服务器的性能


## 项目的配置

 - babel-core      
    如果某些代码需要调用Babel的API进行转码，就要使用babel-core模块。
 - babel-loader     
    打包除标准JS外的任何静态资源文件
 - babel-preset-env  
    可以根据配置的目标浏览器或者运行环境来自动将ES2015+的代码转换为es5
 - babel-preset-react
 - babel-preset-stage-0
 - react
 - react-dom
 - webpack
 - webpack-cli
 - webpack-node-externals  
    在node代码中require一些node-modules时，他不会将代码打包到文件中，而只是保持对node-modules的引用


配置自动打包编译并重新执行Node命令
```js
"scripts": {
  "start": "nodemon build && node \"./build/bundle.js\"",
  "build": "webpack --config webpack.server.js --watch"
}
```

使用npm-run-all 简化操作
全局安装npm-run-all


### 什么是同构？
一套React代码，在服务器端执行一次，在客户端再执行一次

因为服务端渲染代码时使用的renderToString方法只会将DOM渲染上去，而不会将事件绑定上去，解决办法是让这套React代码在浏览器端再执行一次，这就是同构


### 如何让浏览器执行JS代码哪？
再返回的html字符串中加入"<script src='/index.js'></script>", 浏览器获取HTML后就会获取这个index.js

而可以使用express方便的为浏览器提供静态资源。
```js
只要express发现请求了一个静态资源文件，那么express就会帮你去‘/public’下找
app.use(express.static('public'))
```


### 如何让让React代码在客户端再执行一次？
在src下创建client目录，用于存放想要客户端执行的代码，但是客户端并不认识我们写的import啥的，所以就需要webpack对客户端代码进行编译。配置webpack.client.js 描述编译规则，再在package.json中将编译命令添加在dev命令下。


### 工程代码优化整理
提取webpack文件中相同的部分，再使用webapck-merge合并webpack的配置项
安装webpack-merge插件


### React 同构时页面加载流程
1. 浏览器第一次加载页面
2. 服务端运行React代码渲染出无交互的HTML
3. 浏览器接收到内容展示
4. 浏览器加载JS文件
5. JS中React代码在浏览器中重新执行
6. React代码接管页面操作

注意：
服务器端渲染只管第一次进入页面时的路由，而不是每一次路由调转都需要服务器来做一次渲染


### SSR中路由
添加Routes.js，管理路由
在client/index.js中使用 BroswerRouter，
在server/index.js中使用 StaticRouter。
在使用StaticRouter时还需为组件传递路由，不然后端的这个Router不知道到底路由是什么


### 中间层
![midLayer](img/midLayer.png)

node Server 作为中间层负责处理渲染页面相关的内容，它只是一个中间层，只负责展示页面

Java Server 来做复杂的计算和数据库的查询工作


### SSR中异步加载的内容面临的问题
componentDidMount只会在客户端执行，在服务端不会执行。这样的话写在这个生命周期函数中的代码也不会在服务端执行，导致服务端渲染中，返回给页面的HTML里没有异步加载部分的内容。
所以，让服务器端执行componentDidMount这个生命周期函数，就可以解决服务端不能渲染异步加载内容的问题


此时网页执行流程：
1. 服务器接收到请求，这时 store 是空的
2. 服务器端不执行componentDidMount, 所以列表内容获取不到
3. 客户端代码运行，这时store依然是空的
4. 客户端执行componentDidMount, 列表数据被获取
5. store中的列表数据被更新
6. 客户端渲染出store中list数据对应的列表内容


### 异步数据服务器渲染

1. 为componentDidMount里包含有获取数据内容的组件添加loadData方法
2. 把路由改造成数组
3. 使用matchRoutes方法来匹配路由
4. 将路由匹配到的组件加载数据
5. 将数据传递给store，让页面渲染时有内容
6. 将组件渲染成字符串，返回给前端


### 数据的注水和脱水

数据的注水： 服务器端在做页面渲染时会把必要的数据(state)存在window.context对象里面。

数据的脱水： 客户端渲染时，页面加载完成后直接从window.context里获取state数据，来更新store, 而不是去再请求一遍后台。


### SSR网页执行流程
1. 客户端发送请求
2. 服务器端通过req.path和matchRoutes方法获取用户请求的路由。
3. 服务端获取这个组件下需要加载的后端数据(执行组件的loadData方法)并更新store
4. 服务端将store中的state使用字符串拼接的方式，将后台数据即有数据的state保存到返回给客户端的字符串中（放在window.context对象里）
5. 服务端使用renderToString方法将React组件转换成字符串
6. 客户端收到服务端返回的页面，此时的html部分里已经有了这个页面所有的内容
7. 客户端把保存在window中的state拿来初始化store，让客户端拥有和后台初始时一样的store
8. 客户端执行componetDidMount生命周期函数，
