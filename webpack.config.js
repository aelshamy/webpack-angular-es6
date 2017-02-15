var DefinePlugin = require('webpack').DefinePlugin;
var ProvidePlugin = require('webpack').ProvidePlugin;
var optimize = require('webpack').optimize;

var definePlugins = new DefinePlugin({
  TEST: process.env.NODE_ENV === 'test'
});
var providePlugins = new ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  'window.jQuery': 'jquery',
  'windows.jQuery': 'jquery',
})

module.exports = {
  context: __dirname + '/app',
  entry: './index.js',
  output: {
    path: __dirname + '/app',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'ng-annotate-loader!babel-loader'
    }, {
      test: /\.s?css$/,
      exclude: /(node_modules)/,
      loaders: ['style-loader', 'css-loader?sourceMap', 'autoprefixer-loader', 'sass-loader?sourceMap']
    }, {
      test: /\.html$/,
      loader: 'raw-loader'
    }, {
      test: /\.(jpe?g|png|gif)$/,
      exclude: /(node_modules)/,
      loader: 'url-loader?limit=10000'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&minetype=application/font-woff'
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader'
    }]
  },
  plugins: [
    definePlugins,
    providePlugins
  ],
  resolve: {
    extensions: ['.js', '.css']
  }
};

if (process.env.NODE_ENV === 'production') {
  config.output.path = __dirname + '/build';
  config.plugins.push(new optimize.UglifyJsPlugin());
}