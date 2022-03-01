const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// Add and configure workbox plugins for a service worker and manifest file.
  new HtmlWebpackPlugin({
    temple:'./index.html',
    title: 'Text Editor'
  }),
  new InjectManifest({
    swSrc: './src-sw.js',
    swDest: 'src-sw.js',
  }),

 // Add CSS loaders and babel to webpack. 
  new WebpackPwaManifest({
    fingerprints: false,
    inject: true,
    name: 'Just Another Text Editor!',
    short_name: 'JATE',
    description: 'Text Editor Application',
    background_color: '#000000',
    theme_color: '#00FF00',
    start_url: '/',
    publicPath: '/',
    icons: [
      {
        src: path.resolve('src/images/logo.png'),
        sizes: [96, 128, 192, 256, 384, 512],
        destination: path.join('assets', 'icons'),
      },
    ],
  }),

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      
    ],

    module: {
      rules: [
        {
          test: /\.css$i/,
          user: ['style-loader,','css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presents: ['@babel/preset-env'],
              plugins: ['@babel/plugin-propsal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
