const path = require('path');

// import plugins
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const minifyHtmlOptions = {
  collapseWhitespace: true,
  keepClosingSlash: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
};

// paths
const paths = {
  src:        path.resolve(__dirname, 'src'),
  indexPage:  path.resolve(__dirname, 'src', 'index-page'),
  secondPage: path.resolve(__dirname, 'src', 'second-page'),
}

module.exports = {
  // mode
  mode: 'production',
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
    watchFiles: [`${paths.src}/**/*`, 'public/**/*'],
  },

  // input-output
  entry: {
    index: `${paths.src}/index.js`,
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle-[hash:8].js',
    publicPath: '',
    clean: true, // remove 'build/' before new build
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
      // HTML (need for images loading) //
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
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
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
      },
      // IMG //
      {
        test: /\.(jpe?g|svg|png|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "img/[name]-[hash:8][ext]",
        },
      },
      // FONTS //
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name]-[hash:8][ext]',
        },
      },
    ],
  },

  plugins: [
    // add progress bar
    new WebpackBar(),

    // copy assets
    new CopyWebpackPlugin({
      patterns: [
        // { from: 'src/assets/img', to: 'img' },      // copy images
        { from: 'src/assets/robots.txt', to: '' },  // copy robots.txt
      ],
    }),

    new MiniCssExtractPlugin({
      filename: 'styles.bundle-[hash:8].css'
    }),

    // gzip compression
    new CompressionPlugin({ algorithm: 'gzip' }),


    // HTML - MPA //
    new HtmlWebpackPlugin({
      template: `${paths.indexPage}/index.html`,
      filename: 'index.html',
      minify: minifyHtmlOptions,
    }),

    new HtmlWebpackPlugin({
      template: `${paths.secondPage}/second.html`,
      filename: 'second.html',
      minify: minifyHtmlOptions,
    }),

    // add favicons
    new FaviconsWebpackPlugin({
      cache: true,
      logo: `${paths.src}/assets/img/icons/favicon.png`,
      publicPath: './',
      prefix: 'favicons/',
      statsFilename: 'iconstats-[hash:8].json',
      background: '#fff'
    }),
  ]
};
