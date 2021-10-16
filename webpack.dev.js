const path = require('path');

// import plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// paths (__dirname; // nodejs system const)
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

  // input-output (can add another entry file)
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
      '@img': path.resolve(paths.src,   'assets', 'img'), // works in css
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
        loader: 'html-loader',
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
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ]
      },
      // IMG //
      {
        test: /\.(jpe?g|svg|png|gif)$/,
        type: 'asset', // asset/resource(file-loader) | asset/inline(url-loader) | asset/source(raw-loader) | asset (auto)
        generator: {
          filename: 'img/[name][ext]',
        },
      },

      // FONTS //
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
    ],
  },

  plugins: [
    // COPY ASSETS FILES //
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets/robots.txt', to: '' }, // copy robots.tsx
      ],
    }),

    // HTML - MPA //
    // index
    new HtmlWebpackPlugin({
      favicon: `${paths.src}/assets/img/icons/favicon.png`,
      template: `${paths.indexPage}/index.html`,
      filename: 'index.html',
    }),

    // second
    new HtmlWebpackPlugin({
      favicon: `${paths.src}/assets/img/icons/favicon.png`,
      template: `${paths.secondPage}/second.html`,
      filename: 'second.html',
    }),
  ]
};
