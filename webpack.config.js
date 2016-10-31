const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: "./app/App.js",
  devServer: {
    contentBase: "./public",
    hot: true
  },
  eslint: {
    configFile: './.eslintrc'
  },
  output: {
    filename: "public/bundle.js"
  },
  devtool: 'source-map',
  plugins: [
    new Dotenv({
      path: './.env', // if not simply .env
      safe: true // lets load the .env.example file as well
    })
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel"
      }
    ]
  }
};
