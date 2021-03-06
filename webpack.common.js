const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js"
    },
    module: {
        rules: [
            {
                /* app global css loader */
                test: /(?<!\.module).css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                /* component css loader */
                test: /\.module\.css$/,
                use: ["handlebars-loader"]
            },
            {
                /* component template html */
                test: /\.module\.html$/,
                use: "handlebars-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin ({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new CopyWebpackPlugin ({
            patterns: [
                {from: "./src/res/images", to: "res/images"}
            ]
        })
    ]
}