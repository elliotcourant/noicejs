const { resolve } = require('path');
const { CheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader');
const DtsGeneratorPlugin = require('dts-generator-webpack-plugin').default;
const instrument = require('istanbul-instrumenter-loader');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const tsconfig = require('./tsconfig');

const path = {
  root: resolve(process.env.ROOT_PATH),
  source: resolve(process.env.SOURCE_PATH),
  target: resolve(process.env.TARGET_PATH),
  test: resolve(process.env.TEST_PATH)
};

const pattern = {
  source: /^.*src\//
};

const modulePath = {
  index: resolve(path.source, 'index'),
  harness: resolve(path.test, 'harness'),
  shim: resolve(path.source, 'shim')
};

// if `make test-check` was run, type check during lint (takes _forever_)
const typeCheck = process.env['TEST_CHECK'] === 'true';

module.exports = {
  devtool: 'source-map',
  entry: {
    main: modulePath.index,
    test: [modulePath.harness, 'sinon', 'chai']
  },
  mode: 'none',
  module: {
    rules: [{
      test: /\.tsx?$/,
      enforce: 'pre',
      loader: 'tslint-loader',
      options: {
        configFile: 'config/tslint.json',
        typeCheck
      }
    }, {
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader',
      options: {
        compilerOptions: {
          declaration: true,
          outFile: resolve(path.target, "main-bundle.d.ts"),
        },
        configFileName: 'config/tsconfig.json',
        inlineSourceMap: false,
        sourceMap: true
      }
    }, {
      test: /\.tsx?$/,
      enforce: 'post',
      loader: 'istanbul-instrumenter-loader',
      exclude: /node_modules/,
      options: require('./istanbul')
    }]
  },
  output: {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    filename: '[name]-bundle.js',
    hashDigest: 'base64',
    hashFunction: 'sha256',
    library: 'noicejs',
    libraryTarget: 'umd',
    path: path.target
  },
  plugins: [
    new CheckerPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      generateStatsFile: true,
      openAnalyzer: false,
      reportFilename: 'bundles.html'
    }),
    new DtsGeneratorPlugin({
      name: 'noicejs',
      project: path.root,
      exclude: [
        'node_modules/**/*',
        'test/**/*'
      ],
      resolveModuleId: (params) => {
        const module = params.currentModuleId.replace(pattern.source, '');
        if (module === 'index') {
          return 'noicejs';
        }
        return 'noicejs/' + module;
      },
      resolveModuleImport: (params) => {
        return 'noicejs/' + params.importedModuleId.replace(pattern.source, '');
      }
    })
  ],
  resolve: {
    alias: [{
      name: 'dtrace-provider',
      alias: modulePath.shim
    }, {
      name: 'term.js',
      alias: modulePath.shim
    }, {
      name: 'pty.js',
      alias: modulePath.shim
    }, {
      name: 'handlebars',
      alias: 'handlebars/dist/handlebars'
    }, {
      name: 'src',
      alias: path.source,
      onlyModule: false
    }, {
      name: 'test',
      alias: path.test,
      onlyModule: false
    }],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    plugins: [
      new TsConfigPathsPlugin({ tsconfig, compiler: 'typescript' })
    ]
  },
  target: 'node'
};