const webpack = require('webpack');
const path = require('path');
const webpackConfig = {};

function generateConfig(name) {
  var config = {
    entry: './lib/index.js',
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: name + '.js',
      sourceMapFilename: name + '.map',
      library: 'bybitapi',
      libraryTarget: 'umd'
    },
    devtool: "source-map",
    mode: 'production',

    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
      fallback: {
        "assert": false,
        "crypto": require.resolve("crypto-browserify"),
        "buffer": require.resolve("buffer/"),
        "stream": require.resolve("stream-browserify")
      }
    },

    module: {
      rules: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
        { test: /\.tsx?$/, loader: "ts-loader" },

        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        { test: /\.js$/, loader: "source-map-loader" },

        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components|samples|lib|test|coverage)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', {
                'targets': {
                  'node': 'current'
                }
              }]]
            }
          }
        }
      ]
    }
  };

  config.plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ];

  return config;
};

// ['bybitapi', 'bybitapi.min'].forEach(key => {
//   webpackConfig[key] = generateConfig(key);
// });

module.exports = generateConfig('bybitapi');

// module.exports = {
//   entry: "./lib/index.ts",
//   output: {
//     path: 'dist/',
//     filename: "./dist/bundle.js",
//     library: 'bybitapi',
//     libraryTarget: 'umd'
//   },

//   // Enable sourcemaps for debugging webpack's output.
//   devtool: "source-map",

//   resolve: {
//     // Add '.ts' and '.tsx' as resolvable extensions.
//     extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
//   },

//   module: {
//     rules: [
//       // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
//       { test: /\.tsx?$/, loader: "ts-loader" },

//       // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
//       { test: /\.js$/, loader: "source-map-loader" }
//     ]
//   }
// }