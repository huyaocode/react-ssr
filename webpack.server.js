const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node', //告诉webpack，要打包的文件是服务器端文件
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  //在node代码中require一些node-modules时，他不会将代码打包到文件中，而只是保持对node-modules的引用
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          //如果编译的里面有react，那么需要配置presets
          presets: [
            'react',
            'stage-0',
            [
              'env',
              {
                targets: { //表示兼任主流浏览器最新两个版本即可
                  browsers: ['last 2 versions']
                }
              }
            ]
          ]
        }
      }
    ]
  }
}
