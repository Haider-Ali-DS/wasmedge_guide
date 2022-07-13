const path = require("path");
module.exports = {
    mode:"development",
    devtool: "cheap-module-source-map",
    entry : "./npm_main.js",
    output: {
        filename: "npm_main.js",
        path: path.resolve(__dirname, "dist")
    }
}