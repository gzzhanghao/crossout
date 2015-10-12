module.exports = {
  entry: './src/main',
  output: {
    path: 'dist',
    filename: 'bundle.js',
    publicPath: 'dist'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader']
    }, {
      test: /\.less$/,
      loaders: ['style-loader', 'css-loader', 'less-loader']
    }, {
      test: /\.html$/,
      loaders: ['html-loader']
    }]
  },
  devtool: '#source-map',
  resolve: {
    extensions: ['', '.js', '.less', '.html']
  }
};
