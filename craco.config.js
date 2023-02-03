const path = require('path');
const CracoLessPlugin = require('craco-less');
const pathResolve = pathUrl => path.join(__dirname, pathUrl);

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    alias: {
      '@': pathResolve('src'),
    },
  },
  devServer: {
    port: 3600,
    hot: true,
    open: false,
    proxy: {
      '/api': {
        target: 'http://172.16.18.160:9000/srm',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
      '/data_api': {
        target: 'http://172.16.18.160:9000/v1/DataCenter',
        changeOrigin: true,
        pathRewrite: { '^/data_api': '' },
      },
    },
  },
  typescript: {
    enableTypeChecking: true, //是否开启类型检查
  },
};
