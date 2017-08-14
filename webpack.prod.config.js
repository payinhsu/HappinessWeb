var config = require('./config');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  //entry: path.join(__dirname, './examples/App.js'),
  
  entry: [
    './client'
  ],
  
  resolve: {
    root: [ __dirname ],
    extensions:         ['', '.js', '.jsx']
  },
  output: {
    path:       path.join(__dirname, 'dist'),
    filename:   'bundle.js',
    publicPath: config.webContext + 'bundle/'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader?localIdentName=[path][name]---[local]---[hash:base64:5]",
        include: __dirname
      },
      {
        test:    /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: __dirname,
        loaders: ['babel']
      },
		{ test: /\.gif$/, loader: 'url-loader?mimetype=image/png' },
        { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
        { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?name=[name].[ext]' },
        { test: /\.less/, loader: 'style-loader!css-loader!postcss-loader!less-loader', exclude: /node_modules/ },
        { test: /\.md/, loader: 'babel!markdown-jsx-loader'},
        { test: /\.js/, loaders: ['babel'], exclude: /node_modules/},
        { test: /\.js/, loaders: ['babel'], include: path.join(__dirname, '..', 'src')}
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
