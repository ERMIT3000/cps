const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pkg = require('./package.json');

/**
 * Production publicPath для GitHub Pages (project site): …github.io/<имя-репо>/.
 * 1) Переменная WEBPACK_PUBLIC_PATH (например /kata-1st-project-lebedev/) — вручную, если homepage ещё не обновили.
 * 2) Иначе pathname из package.json "homepage".
 * 3) Иначе "/" (корень домена или user site).
 */
function productionPublicPath() {
  const envPath = process.env.WEBPACK_PUBLIC_PATH;
  if (typeof envPath === 'string' && envPath.trim() !== '') {
    let p = envPath.trim();
    if (!p.startsWith('/')) {
      p = `/${p}`;
    }
    if (p !== '/' && !p.endsWith('/')) {
      p += '/';
    }
    return p;
  }
  if (!pkg.homepage) {
    return '/';
  }
  try {
    let pathname = new URL(pkg.homepage).pathname;
    if (pathname !== '/' && !pathname.endsWith('/')) {
      pathname += '/';
    }
    return pathname;
  } catch {
    return '/';
  }
}

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';
  const publicPath = isProd ? productionPublicPath() : '/';

  return {
    entry: './src/entry.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      /* без [contenthash] — предсказуемые имена; кэш браузера при обновлениях сбрасывайте вручную или включите хеш обратно */
      filename: 'js/[name].js',
      clean: true,
      publicPath,
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
      /* локально как на корне; productionPublicPath только для build */
      devMiddleware: {
        publicPath: '/',
      },
    },
  };
};
