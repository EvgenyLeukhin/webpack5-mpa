const path = require('path');
// const webpack = require('webpack');

// import plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// const pages = [
//   {
//     name: 'index',
//     title: 'MPA | Index page',
//   },
//   {
//     name: 'second',
//     title: 'MPA | Second page',
//   },
// ];

// paths
// __dirname; // nodejs system const
const paths = {
  src:        path.resolve(__dirname, 'src'),
  indexPage:  path.resolve(__dirname, 'src', 'index-page'),
  secondPage: path.resolve(__dirname, 'src', 'second-page'),
}

module.exports = {
  // mode
  mode: 'development',
  target: 'web',

  // dev server
  devServer: {
    open: true,
    compress: true,
    port: 8888,
    liveReload: true,
    client: {
      progress: true,
    },
    watchFiles: `${paths.src}/**/*`,
  },

  // input-output
  entry: {
    index: `${paths.src}/index.js`,
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    publicPath: '',
  },

  // to short import
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@css': path.resolve(paths.src,   'assets', 'css'),
      '@img': path.resolve(paths.src,   'assets', 'img'),
      '@icons': path.resolve(paths.src, 'assets', 'img', 'icons'),
      '@fonts': path.resolve(paths.src, 'assets', 'fonts'),
      '@index-page':  paths.indexPage,
      '@second-page': paths.secondPage,
    },
  },

  module: {
    rules: [
      // JS //
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      // CSS //
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ]
      },

      // IMG //
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/inline',
      },
    ],
  },

  plugins: [
    // COPY ASSETS FILES //
    new CopyWebpackPlugin({
      patterns: [
        // { from: 'src/assets/img', to: 'img' },
        { from: 'src/assets/robots.txt', to: '' },
      ],
    }),

    // HTML - MPA //
    new HtmlWebpackPlugin({
      title: 'MPA | Index page',
      favicon: `${paths.src}/assets/img/icons/favicon.png`,
      template: `${paths.indexPage}/index.html`,
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      title: 'MPA | Second page',
      favicon: `${paths.src}/assets/img/icons/favicon.png`,
      template: `${paths.secondPage}/second.html`,
      filename: 'second.html',
    }),
  ]
};

// add bootstrap
{/* <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous"> */}
