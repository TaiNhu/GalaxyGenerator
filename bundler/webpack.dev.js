const commonWebpackConfig = require("./webpack.common")
const {merge} = require("webpack-merge")
const path = require("path")

module.exports = merge(commonWebpackConfig, 
    {
        mode: "development",
        devServer: {
            hot: true,
            host: "192.168.1.177",
            port: 8080,
            static: {
                directory: path.resolve(__dirname, "../static")
            }
        }
    }
)
