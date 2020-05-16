const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.js"
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
                use: ["css-loader"]
            },
            {
                /* component template html */
                test: /\.module\.hbs$/,
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