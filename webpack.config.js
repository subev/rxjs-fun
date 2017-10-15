const path = require('path');

module.exports = {
  //for some reason --watch does not work when configured like this
  // so this setuo works only after "yarn build"
  //entry: {
    //basic: './basic/main',
    //ajax: './ajax/main',
  //},
  //output: {
    //path: path.join(__dirname, "output"),
    //filename: "[name].js"
  //},

  entry: './ajax/main',
  output: {
    filename: "ajax.js"
  },

  module: {
    loaders: [
      {
        test: /.ts$/,
        loader: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  }
}
