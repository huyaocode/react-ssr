const path = require('path');
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')

const clinetConfig = {
  mode: 'development',
  entry: './src/client/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public')
  }
}

module.exports = merge(baseConfig, clinetConfig);
