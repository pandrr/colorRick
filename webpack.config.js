import path from "path"

const sharedConfig = {
    // watch: true,
    entry: './index.js',
    mode: 'development',
    devtool: 'source-map',
    experiments: {
        outputModule: true
    }
};
const moduleConfig = {
    ...sharedConfig,
    output: {
        libraryTarget: 'module',
        filename: 'colorrick.js',
        path: path.resolve("./", 'dist')
    }
};

const cjsConfig = {
    ...sharedConfig,
    output: {
        filename: 'colorrick.cjs',
        path: path.resolve("./", 'dist'),
        iife: true,
        library: {
            type: 'umd',
        },
    }
}
export default [moduleConfig, cjsConfig]

//const path = require('path');
//
//module.exports = [
//  {
//    entry: './index.js',
//    mode: 'production',
//    devtool: 'source-map',
//  
//    output: {
//      path: path.resolve(__dirname, 'dist'),
//      filename: 'colorrick.min.js',
//  
//      library: {
//        name: 'ColorRick',
//        type: 'umd',
//      },
//    },
//  },{
//    entry: './index.js',
//    mode: 'development',
//  
//    output: {
//      path: path.resolve(__dirname, 'dist'),
//      filename: 'colorrick.js',
//  
//      library: {
//        name: 'ColorRick',
//        type: 'umd',
//      },
//    },
//  }]
//
