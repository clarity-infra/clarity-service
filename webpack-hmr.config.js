const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

// class RestartOnCrashPlugin {
//   apply(compiler) {
//     compiler.hooks.done.tap('RestartOnCrashPlugin', (stats) => {
//       if (stats.hasErrors()) {
//         console.error('Build failed. Restarting...');
//         process.exit(1); // Exit the process, will trigger docker to rerun
//       }
//     });
//   }
// }

module.exports = function (options, webpack) {
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    plugins: [
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      new RunScriptWebpackPlugin({
        name: options.output.filename,
        autoRestart: false,
      }),
      // new RestartOnCrashPlugin(),
    ],
  };
};