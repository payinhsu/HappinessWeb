import webpack              from 'webpack';
import assign               from 'object-assign';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import prodCfg              from './webpack.prod.config.js';
import config              from './config';

var path = require('path');
var Autoprefixer = require('less-plugin-autoprefix');

Object.assign = assign;

const BABEL_QUERY = {
  presets: ['react', 'es2015'],
  plugins: [
    ['transform-object-rest-spread'],
    ['transform-class-properties'],
    ['transform-decorators-legacy'],
    [
      'react-transform',
      {
        transforms: [
          {
            transform: 'react-transform-hmr',
            imports:    ['react'],
            locals:     ['module']
          }
        ]
      }
    ]
  ]
}

export default function(app) {
  const webpack_config = Object.assign(prodCfg, {
    context : __dirname,
    devtool : 'eval',

    // devtool: 'inline-source-map',
    entry:   [
      'webpack-hot-middleware/client?path=' + config.webContext + '__webpack_hmr&timeout=2000',
      './client'
    ],
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: "style-loader!css-loader?localIdentName=[path][name]---[local]---[hash:base64:5]",
          exclude: /node_modules/,
          include: __dirname
        },
        {
          test:    /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader:  'babel',
          query:   BABEL_QUERY
        },
		{ test: /\.gif$/, loader: 'url-loader?mimetype=image/png' },
        { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
        { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?name=[name].[ext]' },
		
        { test: /\.less$/, loader: 'style-loader!css-loader!postcss-loader!less-loader', exclude: /node_modules/ },
        { test: /\.md/, loader: 'babel!markdown-jsx-loader'},
        { test: /\.js/, loaders: ['babel'], exclude: /node_modules/},
        { test: /\.js/, loaders: ['babel'], include: path.join(__dirname, '..', 'src')},

      ]
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
	
	  lessLoader: {
		lessPlugins: [
		  new Autoprefixer({
			browsers: ['last 2 versions', "ie >= 10"]
		  })
		]
	  }
  });

  const compiler = webpack(webpack_config);

  app.use(webpackDevMiddleware(compiler, { 
    noInfo: true,
    publicPath: config.webContext + 'bundle/'
  }));
  app.use(webpackHotMiddleware(compiler, {path:'/__webpack_hmr'}));
}
