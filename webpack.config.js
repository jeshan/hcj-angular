// For info about this file refer to webpack and webpack-hot-middleware documentation
// For info on how we're generating bundles with hashed filenames for cache busting:
// https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95#.w99i89nsz
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import path from 'path';

const ENV_SPECIFIC = {
  development: {
    devtool: 'eval-source-map',
    entry: [
      // must be first entry to properly set public path
      './client/webpack-public-path',
      'webpack-hot-middleware/client?reload=true',
      path.resolve(__dirname, 'client/index.js') // Defining path seems necessary for this to work consistently on Windows machines.
    ],
    jsFilename: 'bundle.js',
    eotLoader: 'file-loader',
    woffLoader: 'url-loader?limit=10000&mimetype=application/font-woff',
    ottfLoader: 'url-loader?limit=10000&mimetype=application/octet-stream',
    svgLoader: 'url-loader?limit=10000&mimetype=image/svg+xml',
    moduleRules: [{
      test: /(\.css|\.scss|\.sass)$/,
      loaders: ['style-loader', 'css-loader?sourceMap', 'postcss-loader', 'sass-loader?sourceMap']
    }],
    stats: {maxModules: Infinity, exclude: undefined},
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
        __DEV__: true
      }),

      new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin(),

      // Generate HTML file that contains references to generated bundles. See here for how this
      // works: https://github.com/ampedandwired/html-webpack-plugin#basic-usage
      new HtmlWebpackPlugin({
        template: 'client/index.html',
        favicon: 'client/favicon.ico',
        minify: {
          removeComments: true,
          collapseWhitespace: true
        },
        inject: true
        // Note that you can add custom options here if you need to handle other custom logic in
        // index.html
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        noInfo: false, // set to false to see a list of every file being bundled.
        options: {
          sassLoader: {
            includePaths: [path.resolve(__dirname, 'client', 'scss')]
          },
          context: '/',
          postcss: () => [autoprefixer]
        }
      })
    ]
  },
  production: {
    devtool: 'source-map',
    entry: path.resolve(__dirname, 'client/index'),
    jsFilename: '[name].[chunkhash].js',
    definePluginOpts: {
      'process.env.NODE_ENV': JSON.stringify('production'),
      __DEV__: false
    },
    eotLoader: 'url-loader?name=[name].[ext]',
    woffLoader: 'url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]',
    ottfLoader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=[name].[ext]',
    svgLoader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]',
    moduleRules: [{
      test: /(\.css|\.scss|\.sass)$/,
      loader: ExtractTextPlugin.extract('css-loader?sourceMap!postcss-loader!sass-loader?sourceMap')
    }],
    plugins: [
      // Hash the files using MD5 so that their names change when the content changes.
      new WebpackMd5Hash(),

      // build in prod mode
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        __DEV__: false
      }),

      // Generate an external css file with a hash in the filename
      new ExtractTextPlugin('[name].[contenthash].css'),

      // Generate HTML file that contains references to generated bundles. See here for how this works: https://github.com/ampedandwired/html-webpack-plugin#basic-usage
      new HtmlWebpackPlugin({
        template: 'client/index.html',
        favicon: 'client/favicon.ico',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        },
        inject: true,
        // Note that you can add custom options here if you need to handle other custom logic in index.html
        // To track JavaScript errors via TrackJS, sign up for a free trial at TrackJS.com and enter your token below.
        trackJSToken: ''
      }),

      // Minify JS
      new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),

      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        noInfo: true, // set to false to see a list of every file being bundled.
        options: {
          sassLoader: {
            includePaths: [path.resolve(__dirname, 'client', 'scss')]
          },
          context: '/',
          postcss: () => [autoprefixer]
        }
      })
    ]
  }
};

export default (envName = ((process.node && process.node.NODE_ENV) || 'development'),
  envVars = ENV_SPECIFIC[envName]) => ({
  resolve: {
    extensions: ['*', '.js', '.json'],
    modules: ['node_modules', path.resolve(__dirname, 'swagger-javascript-client/src')]
  },
  devtool: envVars.devtool, // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
  entry: envVars.entry,
  target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    publicPath: '/',
    filename: envVars.jsFilename
  },
  plugins: envVars.plugins,
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
      {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: envVars.eotLoader},
      {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: envVars.woffLoader},
      {test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, loader: envVars.ottfLoader},
      {test: /\.svg(\?v=\d+.\d+.\d+)?$/, loader: envVars.svgLoader},
      {test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader?name=[name].[ext]'},
      {test: /\.ico$/, loader: 'file-loader?name=[name].[ext]'},
      {test: /\.html$/, loader: 'raw-loader'}].concat(envVars.moduleRules)
  },
  node: {
    fs: 'empty'
  }
});
