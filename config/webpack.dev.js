const { merge } = require("webpack-merge");
const path = require("path");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { AngularWebpackPlugin } = require("@ngtools/webpack");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  entry: "./src/main.ts",
  output: {
    publicPath: "http://user.local.dev.ge/",
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "../dist"),
    clean: true,
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "../dist"),
    },
    allowedHosts: "all",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    historyApiFallback: true,
    hot: true,
    port: 4200,
    client: {
      overlay: false,
    },
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: '@ngtools/webpack',
          // loader: "babel-loader",
          // options: {
          //   presets: [
          //     ["@babel/preset-env", { targets: "defaults" }],
          //     "@babel/preset-typescript",
          //   ],
          //   plugins: [
          //     ["@babel/plugin-proposal-decorators", { legacy: true }],
          //     ["@babel/plugin-proposal-class-properties", { loose: true }],
          //   ],
          // },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        use: 'raw-loader',
      },
      {
        test: /\.scss$/,
        oneOf: [
          {
            resourceQuery: /ngResource/, // Angular component styles
            use: ["to-string-loader", "css-loader", "sass-loader"],
          },
          {
            // Global SCSS files
            use: ["style-loader", "css-loader", "sass-loader"],
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".js", ".tsx"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "UserDomainApp",
      filename: "remoteEntry.js",
      exposes: {
        "./UserDomainApp": "./src/bootstrap.ts",
        './BaseInfoService': './src/app/shared/base-info.service.ts'
      },
      shared: packageJson.dependencies,
      //       shared: {
      //   // Angular core packages
      //   "@angular/core": { singleton: true, strictVersion: true, requiredVersion: "auto" },
      //   "@angular/common": { singleton: true, strictVersion: true, requiredVersion: "auto" },
      //   "@angular/router": { singleton: true, strictVersion: true, requiredVersion: "auto" },
      //   "@angular/platform-browser": { singleton: true, strictVersion: true, requiredVersion: "auto" },
      //   "@angular/platform-browser-dynamic": { singleton: true, strictVersion: true, requiredVersion: "auto" },
      //   "@angular/forms": { singleton: true, strictVersion: true, requiredVersion: "auto" },

      //   // React side (main app-თან რომ გაუზიაროს იგივე ინსტანციები)
      //   react: { singleton: true, eager: true, requiredVersion: '^19.1.0' },
      //   "react-dom": { singleton: true, eager: true, requiredVersion: '^19.1.0' },
      //   "react-router-dom": { singleton: true, eager: true, requiredVersion: '^7.6.3' },

      //   // სხვა საჭიროები
      //   rxjs: { singleton: true, strictVersion: true, requiredVersion: "auto" },
      //   tslib: { singleton: true, strictVersion: true, requiredVersion: "auto" }
      // }

    }),
    new AngularWebpackPlugin({
      tsconfig: path.resolve(__dirname, "../tsconfig.app.json"),
      jitMode: true,
      directTemplateLoading: true,
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};

// Optional: merge with common config if you have it
// const commonConfig = require('./webpack.common');
// module.exports = merge(commonConfig, devConfig);

module.exports = devConfig;