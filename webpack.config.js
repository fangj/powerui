var webpack = require("webpack");

module.exports={
  entry:{
    index:'./index.js'
  },
  output:{
    filename:'[name].bundle.js'
  },
  module:{
    loaders:[
      {
        test:/\.js/,
        loader:'babel-loader',
        exclude:/node_modules/
      }
    ]
  }
}