const path = require('path');

module.exports = [
  {
    entry: './index.js',
    mode: 'production',
    devtool: 'source-map',
  
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'colorrick.min.js',
  
      library: {
        name: 'ColorRick',
        type: 'umd',
      },
    },
  },{
    entry: './index.js',
    mode: 'development',
  
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'colorrick.js',
  
      library: {
        name: 'ColorRick',
        type: 'umd',
      },
    },
  }]
