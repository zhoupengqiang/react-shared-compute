const path = require('path');

const config = {
  entry: [
    'react-hot-loader/patch',
    path.resolve(__dirname, './src/index.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                  useBuiltIns: 'usage',
                }
              ],
              '@babel/preset-react'
            ],
            plugins: [
              'react-hot-loader/babel'
            ]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  devServer: {
    contentBase: './demo/dist'
  }
};

module.exports = config;