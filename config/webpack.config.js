'use strict';

const path = require('path');

const cssnano = require('cssnano');
const dotEnv = require('dotenv');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CssExtractPlugin = require('mini-css-extract-plugin');
const CssOptimizationPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { ProgressPlugin } = require('webpack');

module.exports = (env = {}) => {
  const {
    analyze: needAnalyze,
    deploy: needDeploy,
    purpose,
  } = env;

  process.env.BABEL_ENV = purpose;
  process.env.NODE_ENV = purpose;

  const isDevelopment = (purpose === 'development');
  const isProduction = (purpose === 'production');

  const assetHash = isProduction ? '.[contenthash]' : '';
  const publicPath = isProduction ? 'https://yialo.github.io/task-react-card-filter/' : '/';

  const rootPath = path.join(__dirname, '../');
  const configPath = path.join(rootPath, 'config');
  const distPath = path.join(rootPath, needDeploy ? 'docs' : 'dist');
  const srcPath = path.join(rootPath, 'src');

  console.log(rootPath);
  console.log(configPath);

  const Path = {
    CONFIG: configPath,
    DIST: distPath,
    SRC: srcPath,
    ROOT: rootPath,
    BABEL_CONFIG: path.join(configPath, 'babel.config.js'),
    HTML_TEMPLATE: path.join(srcPath, 'index.ejs'),
    LOCAL_ENV_FILE: path.join(rootPath, '.env.local'),
    TEST_INPUT: path.join(srcPath, 'tests.js'),
    TEST_OUTPUT: path.join(rootPath, 'tests'),
  };

  const aliasEnum = {
    '@': srcPath,
  };

  dotEnv.config({ path: Path.LOCAL_ENV_FILE });

  return {
    context: Path.SRC,

    devServer: (() => {
      const config = {};
      if (isDevelopment) {
        Object.assign(config, {
          host: process.env.WDS_HOST,
          port: process.env.WDS_PORT,
          hot: false,
          inline: true,
          overlay: true,
          writeToDisk: true,
        });
      }
      return config;
    })(),

    devtool: isDevelopment ? 'eval-source-map' : false,

    entry: {
      'app': Path.SRC,
    },

    mode: (isDevelopment || isProduction) ? purpose : 'none',

    module: {
      rules: (() => {
        const scriptLoaderRule = {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          options: {
            configFile: Path.BABEL_CONFIG,
          },
        };

        const styleLoaderRule = {
          test: /\.css$/,
          use: [
            isProduction ? CssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                config: {
                  ctx: {
                    pathAliasEnum: aliasEnum,
                  },
                  path: Path.CONFIG,
                },
              },
            },
          ],
        };

        const templateLoader = {
          test: /\.ejs$/,
          loader: 'ejs-loader',
        };

        const getFileLoaderRule = ({ testRegexp, outputSubdir }) => ({
          test: testRegexp,
          loader: 'file-loader',
          options: {
            name: `[name]${assetHash}.[ext]`,
            outputPath: `assets/${outputSubdir}`,
          },
        });

        return [
          scriptLoaderRule,
          styleLoaderRule,
          templateLoader,
          getFileLoaderRule({
            testRegexp: /\.(jpe?g|png|svg)$/,
            outputSubdir: 'img',
          }),
          getFileLoaderRule({
            testRegexp: /\.woff2?$/,
            outputSubdir: 'fonts',
          }),
        ];
      })(),
    },

    optimization: (() => {
      const config = {
        noEmitOnErrors: true,
        splitChunks: {
          chunks: 'all',
          minChunks: 2,
          cacheGroups: {
            default: false,
            vendor: {
              name: 'vendors',
              test: /[\\/]node_modules[\\/]/,
              enforce: true,
            },
          },
        },
      };

      if (isProduction) {
        config.minimizer = [
          new TerserPlugin({
            extractComments: false,
            terserOptions: {
              compress: {
                drop_console: true,
                drop_debugger: true,
              },
              output: {
                comments: false,
              },
            },
          }),
          new CssOptimizationPlugin({
            assetNameRegExp: /\.css$/,
            cssProcessor: cssnano,
            cssProcessorPluginOptions: {
              preset: [
                'default',
                {
                  discardComments: true,
                },
                {
                  normalizeCharset: {
                    add: true,
                  },
                },
              ],
            },
            canPrint: true,
          }),
        ];
      }
      return config;
    })(),

    output: {
      filename: `assets/js/[name]${assetHash}.js`,
      path: Path.DIST,
      publicPath,
    },

    plugins: (() => {
      const pluginList = [
        new CaseSensitivePathsPlugin(),
        new CleanWebpackPlugin(),
        new ProgressPlugin(),
        new CssExtractPlugin({
          filename: `assets/css/[name]${assetHash}.css`,
        }),
        new HtmlPlugin({
          filename: 'index.html',
          template: Path.HTML_TEMPLATE,
        }),
      ];

      if (needAnalyze) {
        pluginList.push(new BundleAnalyzerPlugin({
          analyzerPort: 8889,
        }));
      }
      return pluginList;
    })(),

    resolve: {
      alias: aliasEnum,
    },

    stats: (() => {
      const statsConfig = {
        colors: true,
      };
      if (isDevelopment) {
        Object.assign(statsConfig, {
          assets: false,
          entrypoints: false,
          modules: false,
        });
      }
      return statsConfig;
    })(),

    target: 'web',
  };
};
