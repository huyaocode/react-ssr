module.exports = {
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