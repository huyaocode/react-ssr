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


### 什么是同构？
一套React代码，在服务器端执行一次，在客户端再执行一次

因为服务端渲染代码时使用的renderToString方法只会将DOM渲染上去，而不会将事件绑定上去，解决办法是让这套React代码在浏览器端再执行一次，这就是同构


### 什么是SEO？
SEO(Search engin optimization) 搜索引擎优化。指通过一些手段，让网站在搜索引擎搜索时排名更加靠前。

搜索引擎在爬取页面内容时，绝大多数搜索引擎是不认识JS渲染出来的内容的，它只查看返回的html中的内容。

假设网站是客户端渲染出来的，查看源代码就会看见只有一个id=root的根元素，搜素引擎就不知道页面的内容，当前排名就很低。


### 如何做好SEO？
网站基本由三个部分组成： 文字、链接、多媒体（图像视频等）
1. 文字的原创性。如果一篇文章是原创的，那么他的价值一定超过转载和抄袭的文章。所以百度在搜索时会把原创当作一个重要的指标。就比如转载的博客访问量就远没有原创的文章浏览量多。

2. 内部链接的相关性和外部链接的数量。一个网站上的内容与他链接网站的内容要尽量相关，相关度越强，链接的价值就越大。而一个网站有很多都外链到了这个网站，说明了这个网站的影响力是很大的。
比如一个网站是做教育的，但是链接网站很多广告是游戏、体育的，那么说明这个网站多半也不靠谱。

3. 多媒体优化。现在有的搜索引擎可以做图像的识别了，比如谷歌。如果一个网站上的图片能做到原创和高清，那么搜索引擎回认为这个网站更丰富一些。

4. 定制好title和meta description也可以提高排名。


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



### CSS 样式修饰
配置loader，引入`isomorphic-style-loader`来做服务器端样式的加载，但是isomorphic不会在返回的html的head标签中直接注入样式，只会在标签上留下变量名。
实现方法：
1. 在组件的`compoentWillMount`时将`styles._getCss()`保存到context.css中，
2. 在服务端返回页面前，获取context.css并把他写入返回的字符串中就可以实现
3. 使用高阶组件可以简化操作，不需要每个组件都在compoentWillMount中获取样式
   


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



### 让node代码变为中间层 - 请求的代理转发
让Nodejs变为中间层，那就要让客户端发送的所有请求都只与node中间层打交道。
在nodejs端 使用express-http-proxy将请求转发到后端，但是在异步获取数据时会出现一个问题

比如一个请求 'api/news.json'

浏览器运行
'api/news.json' = localhost:3000/api/news.json

服务器运行
'api/news.json' = 服务器根目录下/api/news.json

解决方法：
判断到底是哪里执行的ajax请求，然后访问不同的url


### axios-instances来做路由前缀配置
分别为客户端和服务端配置一个请求地址前缀（baseURL属性），使用这个instance来发送请求，就可以提高代码的维护性 


### 多级路由
比如我们需要很多页面共享header组件，那么就可以使用多级路由来做，而不是每一个组件都去引用这个组件。
使用方法：
1. 将路由改写为多级嵌套的形式
2. 使用 renderRoutes(routes) 在根组件中渲染路由
在App.js中接收props然后渲染匹配到的子路由
```js
const App = (props) => {
  return (
    <div>
      <Header />
      { renderRoutes(props.route.routes) }
    </div>
  )
}
```


### 使用cookie时需要注意的地方

如果中间层不转发cookie，那么就会出现bug, 以登陆举例

1. 用户刚进入页面，处于非登陆状态
2. 用户点击登陆按钮，进行登陆操作
   1. 浏览器发送请求给NodeJS服务器
   2. NodeJS转发给api服务器，进行登陆
   3. api服务器上生成cookie，返回登陆成功数据
   4. NodeJS转发登陆成功数据，登陆成功
3. 当用户重新刷新页面的时候
   1. 浏览器请求html (携带了cookie)
   2. NodeJS服务器进行服务端渲染
   3. 进行服务端渲染，首先要去api服务器获取数据(没有携带cookie)



### context 实现404页面状态码为404

`StaticRouter`组件可接收一个`context`对象，这个对象会传递到每一个组件的`this.props.staticContext`中。
而当404页面组件加载时修改这个`staticContext`对象就可以让server/index.js知道这个页面的状态码为多少，从而设置状态码
```html
<StaticRouter location={req.path} context={context}>
```


### context 实现服务端的301重定向
当页面重定向时，如果不再服务端配置，那么就会使得只有客户端重定向，而查看源代码就发现服务端提供的还是重定向前的页面的html
当需要重定向时，StaticRouter会自动向context中添加一个对象，对象的格式如下：
```js
{
  action: 'REPLACE',
  url: '/',
  location: {
    pathname: '/',
    search: '',
    hash: '',
    state: undefined
  }
}
```
这时我们就可以这样做：
```js
if(context.action === 'REPLACE') {
  res.redirect(301, context.url)
}
```
这个时候就做到了服务端重定向，返回的Html页面就直接是重定向后的页面了



### 数据请求失败的情况下Promise的处理
如果页面加载前需要获取几个api请求，但是这其中有一个Promise失败了这要如何处理哪？ 
最好的办法是将能获取成功的数据都展示出来，获取失败的部分就算了，而不是展示一个报错页面。
但使用Promise.all时如果一个请求失败了那么直接就会执行Promise.all().catch()方法了。如果其他的一些请求本来是可以成功加载的，但是因为它执行的比较慢则会被忽略掉。

解决问题的方法是在这些promise外再包裹一个promise，不论数据加载成功与否，都执行包裹promise的resolve方法，这样就使得promise.all的等待都是正确的promise，只不过加载出错的promise对象中内容不是想要的而已。



### 使用`React-Helmet`定制title和meta-description

在页面组件中写入想要定制的title和meta
```html
<Helmet>
  <title>Huyao的SSR新闻页面 - 丰富多彩的咨询</title>
  <meta name="description" content="Huyao的SSR新闻页面 - 丰富多彩的咨询"/>
</Helmet>
```
因为是服务端渲染，所以还需要将title、meta渲染到html字符串中。
```js
  const helmet = Helmet.renderStatic();
  ${helmet.title.toString()}  //title标签
  ${helmet.meta.toString()}   // meta标签
```