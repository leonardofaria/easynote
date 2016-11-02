const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './app/App.js',
  ],
  devServer: {
    contentBase: './public',
    hot: true,
  },
  eslint: {
    configFile: './.eslintrc',
  },
  output: {
    filename: 'public/bundle.js',
  },
  devtool: 'source-map',
  plugins: [
    new Dotenv({
      path: './.env', // if not simply .env
      safe: true, // lets load the .env.example file as well
    }),
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
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
