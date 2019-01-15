const path = require('path');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')

const serverConfig = {
  target: 'node', //告诉webpack，要打包的文件是服务器端文件
  mode: 'development',
  entry: './src/server/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  //在node代码中require一些node-modules时，他不会将代码打包到文件中，而只是保持对node-modules的引用
  externals: [nodeExternals()]
};


module.exports = merge(baseConfig, serverConfig);