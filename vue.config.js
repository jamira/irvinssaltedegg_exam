module.exports = {
  devServer: {
    proxy: {
      '/api/products': {
        target: 'http://s3.irvinsaltedegg.com.s3-ap-southeast-1.amazonaws.com/engineering-test/products.json',
        pathRewrite: { '^/api/products': '' },
        changeOrigin: true,
        ws: true
      }
    }
  }
}
