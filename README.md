# react-ssr
react服务端渲染

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