module.exports = {
  entry: {
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
        loader: 'style!css?module&localIdentName=[local]_[hash:base64:10]!less'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, loader: 'babel'
      }
    ]
  }
}