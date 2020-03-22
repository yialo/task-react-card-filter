'use strict';

const resolver = require('postcss-import-resolver');

module.exports = (ctx) => {
  const { pathAliasEnum } = ctx.options;
  return {
    plugins: {
      'postcss-import': {
        resolve: resolver({
          alias: pathAliasEnum,
        }),
      },
      'postcss-preset-env': {
        stage: 3,
        features: {
          'custom-media-queries': true,
          'custom-properties': false,
          'custom-selectors': true,
          'matches-pseudo-class': true,
          'nesting-rules': true,
          'not-pseudo-class': true,
        },
      },
    },
  };
};
