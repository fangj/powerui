var path=require("path");

module.exports={
  entry:{
    index:'./index.js'
  },
  output:{
    path: path.join(__dirname,"public"),
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