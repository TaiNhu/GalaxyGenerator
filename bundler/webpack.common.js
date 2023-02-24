const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: {
        main: path.resolve(__dirname, "../src/main.js")
    },
    output: {
        filename: "[name][contenthash].js",
        path: path.resolve(__dirname, "../dist"),
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, "../src/index.html")
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /.(png|jpg|svg|giff)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "assets/images/"
                        }
                    }
                ]
            },
            {
                test: /.(ttf|woff|woff2|eot)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "assets/fonts/"
                        }
                    }
                ]
            },
        ]
    }
}
