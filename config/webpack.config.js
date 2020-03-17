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
const { DefinePlugin, ProgressPlugin } = require('webpack');

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
  const isTest = (purpose === 'test');

  const assetHash = isProduction ? '.[contenthash]' : '';
  const publicPath = isProduction ? 'https://yialo.github.io/task-react-card-filter/' : '/';

  const rootPath = path.resolve(__dirname, '../');
  const configPath = path.join(rootPath, 'config');
  const distPath = path.join(rootPath, needDeploy ? 'docs' : 'dist');
  const srcPath = path.join(rootPath, 'src');

  const pathEnum = {
    CONFIG: configPath,
    DIST: distPath,
    SRC: srcPath,
    ROOT: rootPath,
    BABEL_CONFIG: path.join(configPath, 'babel.config.js'),
    HTML_TEMPLATE: path.join(srcPath, 'index.html'),
    LOCAL_ENV_FILE: path.join(rootPath, '.env.local'),
    TEST_INPUT: path.join(srcPath, 'tests.js'),
    TEST_OUTPUT: path.join(rootPath, 'tests'),
  };

  const aliasEnum = {
    '@': srcPath,
  };

  dotEnv.config({ path: pathEnum.LOCAL_ENV_FILE });

  return {
    context: pathEnum.SRC,

    devServer: (() => {
      if (isDevelopment) {
        return {
          host: process.env.WDS_HOST,
          port: process.env.WDS_PORT,
          hot: true,
          inline: true,
          overlay: true,
          writeToDisk: (filePath) => !filePath.match(/\.hot-update\.js(?:on|\.map)?$/),
        };
      }

      return {};
    })(),

    devtool: isDevelopment ? 'eval-source-map' : false,

    entry: (() => {
      if (isTest) {
        return pathEnum.TEST_INPUT;
      }

      return {
        'app': pathEnum.SRC,
      };
    })(),

    mode: (isDevelopment || isProduction) ? purpose : 'none',

    module: {
      rules: (() => {
        const scriptLoaderRule = {
          test: /\.jsx?$/,
          exclude: '/node_modules/',
          loader: 'babel-loader',
          options: {
            configFile: pathEnum.BABEL_CONFIG,
          },
        };

        if (isTest) {
          return [scriptLoaderRule];
        }

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
          {
            test: /\.css$/,
            exclude: '/node_modules/',
            use: [
              (isProduction ? CssExtractPlugin.loader : 'style-loader'),
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
                    path: pathEnum.CONFIG,
                  },
                },
              },
            ],
          },
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
      const output = {
        noEmitOnErrors: true,
      };

      if (!isTest) {
        output.splitChunks = {
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
        };
      }

      if (isProduction) {
        output.minimizer = [
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

      return output;
    })(),

    output: (() => {
      if (isTest) {
        return {
          filename: 'test_output.js',
          path: pathEnum.TEST_OUTPUT,
        };
      }

      return {
        filename: `assets/js/[name]${assetHash}.js`,
        path: pathEnum.DIST,
        publicPath,
      };
    })(),

    plugins: (() => {
      const output = [
        new CaseSensitivePathsPlugin(),
        new CleanWebpackPlugin({
          cleanStaleWebpackAssets: false,
        }),
        new DefinePlugin({
          'publicPath': JSON.stringify(publicPath),
        }),
        new ProgressPlugin(),
      ];

      if (!isTest) {
        const mainPlugins = [
          new CssExtractPlugin({
            filename: `assets/css/[name]${assetHash}.css`,
          }),
          new HtmlPlugin({
            filename: 'index.html',
            template: pathEnum.HTML_TEMPLATE,
          }),
        ];
        output.push(...mainPlugins);
      }

      if (needAnalyze) {
        output.push(new BundleAnalyzerPlugin({
          analyzerPort: 8889,
        }));
      }

      return output;
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
