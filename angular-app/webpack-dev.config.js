const Dotenv = require("dotenv-webpack");

module.exports = {
  plugins: [
    new Dotenv(),
  ],
  node: {
    fs: "empty"
  }
};