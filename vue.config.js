const path = require('path')
const fs = require('fs')

var CopyWebpackPlugin = require('copy-webpack-plugin')
var webpack = require('webpack')
const vantComponents = [
  'button',
  'cell',
  'cell-group',
  'col',
  'common',
  'count-down',
  'icon',
  'info',
  'loading',
  'mixins',
  'notify',
  'popup',
  'overlay',
  'picker',
  'calendar',
  'nav-bar',
  'checkbox-group',
  'checkbox',
  'picker-column',
  'datetime-picker',
  'row',
  'toast',
  'tab',
  'tabs',
  'transition',
  'field',
  'sticky',
  'wxs',
  'dialog',
  'goods-action',
  'goods-action-button',
  'search',
  'action-sheet'
]
const vantIgnored = fs
  .readdirSync(path.resolve(__dirname, './node_modules/@vant/weapp/dist'))
  .filter(f => !vantComponents.includes(path.basename(f)))

module.exports = {
  css: {
    loaderOptions: {
      less: {}
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        vant: path.resolve(__dirname, './node_modules/@vant/weapp/dist')
      }
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, './node_modules/@vant/weapp/dist'),
          to: path.join(
            __dirname,
            'dist',
            process.env.NODE_ENV === 'production' ? 'build' : 'dev',
            process.env.UNI_PLATFORM,
            'static/vant'
          ),
          ignore: [`**/{${vantIgnored.join(',')}}/**`, '*.ts']
        }
      ]),
      new webpack.DefinePlugin({
        ENV: JSON.stringify(process.env.APP_ENV)
      })
    ]
  }
}
