const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    entry: './src/entry.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      /* без [contenthash] — предсказуемые имена; кэш браузера при обновлениях сбрасывайте вручную или включите хеш обратно */
      filename: 'js/[name].js',
      clean: true,
      publicPath: '/',
    },
    devtool: isProd ? false : 'source-map',
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { url: true },
            },
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { url: true },
            },
            'postcss-loader',
          ],
        },
        {
          test: /\.(woff|woff2)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][ext]',
          },
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          type: 'asset/resource',
          generator: {
            /* короткий хеш только если два файла с одним именем из разных папок */
            filename: 'img/[name].[contenthash:6][ext]',
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        inject: 'body',
        /* true в production даёт одну строку; false — читаемый HTML в dist */
        minify: false,
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'pics',
            to: 'pics',
            globOptions: {
              ignore: ['**/.DS_Store'],
            },
          },
        ],
      }),
    ],
    devServer: {
      hot: true,
      port: 8080,
      open: true,
    },
  };
};
