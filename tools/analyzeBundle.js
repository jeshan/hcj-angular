import webpack from 'webpack';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import config from '../webpack.config';

config.plugins.push(new BundleAnalyzerPlugin());

const compiler = webpack(config('production'));

compiler.run((error, stats) => {
  if (error) {
    throw new Error(error);
  }

  console.log(stats); // eslint-disable-line no-console
});
