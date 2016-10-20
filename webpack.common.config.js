module.exports = {
  entry: {
    page: './asset/page',
    app: './asset/app'
  },
  output: {
    path: './asset',
    filename: '[name].min.js'
  },
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, loader: 'babel'
      }
    ]
  }
}