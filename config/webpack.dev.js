const { merge } = require('webpack-merge');
const path = require('path');
const  ModuleFederationPlugin  = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');
const { AngularWebpackPlugin } = require('@ngtools/webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

 
const devConfig = {
  mode: 'development',
  entry: './src/main.ts',
  output: {
    publicPath: 'http://localhost:4200/',
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
 
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../dist'),
    },
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
    hot: true,
    port: 4200,
    historyApiFallback: true,
    client: {
      overlay: false,
    },
  },
  devtool: 'inline-source-map',
  plugins: [
    new ModuleFederationPlugin({
      name: 'UserDomainApp',
      filename: 'remoteEntry.js',
      exposes: {
        './UserDomainApp': './src/main.ts',
      },
    //   remotes: {
    //     dashboard_test: 'dashboard_test@http://localhost:3005/remoteEntry.js',
    //     native_app: 'native_app@http://localhost:8080/remoteEntry.js',
    //   },
      shared: packageJson.dependencies,
    }),
    new AngularWebpackPlugin({
      tsconfig: path.resolve(__dirname, '../tsconfig.app.json'),
      jitMode: false, // ✅ ეს უთხრას რომ AOT ფორმატში გაკომპილოს
      directTemplateLoading: true,
      jitter: false,
  }),
  ],
};
 
// module.exports = merge(require('./webpack.common'), devConfig);

module.exports = {
    mode: 'development',
  entry: './src/main.ts',
  output: {
    publicPath: 'http://localhost:4200/',
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
 
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../dist'),
    },
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
    hot: true,
    port: 4200,
    historyApiFallback: true,
    client: {
      overlay: false,
    },
  },
  devtool: 'inline-source-map',
  plugins: [
    new ModuleFederationPlugin({
      name: 'UserDomainApp',
      filename: 'remoteEntry.js',
      exposes: {
        './UserDomainApp': './src/main.ts',
      },
    //   remotes: {
    //     dashboard_test: 'dashboard_test@http://localhost:3005/remoteEntry.js',
    //     native_app: 'native_app@http://localhost:8080/remoteEntry.js',
    //   },
      shared: packageJson.dependencies,
    }),
    new AngularWebpackPlugin({
      tsconfig: path.resolve(__dirname, '../tsconfig.app.json'),
      jitMode: false, // ✅ ეს უთხრას რომ AOT ფორმატში გაკომპილოს
      directTemplateLoading: true,
      jitter: false,
  }),
  ],




  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              '@babel/preset-typescript'
            ],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
