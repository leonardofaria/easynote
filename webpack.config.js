const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  // The entry file. All your app roots fromn here.
  entry: [
    './app/App.js',
  ],

  // Where you want the output to go
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/',
  },

  devtool: 'source-map',

  eslint: {
    configFile: './.eslintrc',
  },

  plugins: [
    new Dotenv({
      path: './.env', // if not simply .env
      safe: true, // lets load the .env.example file as well
    }),

    // handles creating an index.html file and injecting assets. necessary because assets
    // change name because the hash part changes. We want hash name changes to bust cache
    // on client browsers.
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
    }),

    // extracts the css from the js files and puts them on a separate .css file. this is for
    // performance and is used in prod environments. Styles load faster on their own .css
    // file as they dont have to wait for the JS to load.
    new ExtractTextPlugin('[name]-[hash].min.css'),
  ],

  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    ],

    loaders: [
      // loaders handle the assets, like transforming sass to css or jsx to js.
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.scss$/,
        // we extract the styles into their own .css file instead of having
        // them inside the js.
        loader: ExtractTextPlugin.extract('style', 'css!sass'),
      },
      {
        test: /\.json?$/,
        loader: 'json'
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        loader: 'file-loader?name=assets/images/[name].[ext]',
      },
      {
        test: /\.woff(2)?(\?[a-z0-9]+)?$/,
        loader: "file-loader?limit=10000&mimetype=application/font-woff&name=assets/fonts/[name].[ext]"
      }, {
        test: /\.(ttf|eot)(\?[a-z0-9]+)?$/,
        loader: "file-loader?name=assets/fonts/[name].[ext]"
      }
    ],
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      normalize: path.join(__dirname, '/node_modules/normalize.css/normalize.css'),
      medium_editor: path.join(__dirname, '/node_modules/medium-editor/dist/css/medium-editor.css'),
      medium_editor_theme: path.join(__dirname, '/node_modules/medium-editor/dist/css/themes/default.css'),
    }
  },
};
