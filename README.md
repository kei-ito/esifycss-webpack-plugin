# esifycss-webpack-plugin

[![Test](https://github.com/kei-ito/esifycss-webpack-plugin/actions/workflows/test.yml/badge.svg)](https://github.com/kei-ito/esifycss-webpack-plugin/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/kei-ito/esifycss-webpack-plugin/branch/master/graph/badge.svg)](https://codecov.io/gh/kei-ito/esifycss-webpack-plugin)

This plugin adds a resolver for [EsifyCSS](https://github.com/kei-ito/esifycss).
The resolver resolves `*.module.css` to `*.modules.css.js` or `*.modules.css.ts`.

## Usage

Add this plugin to your `webpack.config.js`.

```javascript
const EsifyCSSWebpackPlugin = require('esifycss-webpack-plugin');

module.exports = {
  ...{}, // other configurations
  plugins: [
    new EsifyCSSWebpackPlugin(),
  ],
};
```
