const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    mode: "production",
    entry: ["@babel/polyfill", path.resolve(__dirname, "src/index.tsx")],
    output: {
        filename: "js/bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    stats: "only-error",
    target: "web",
    devtool: "source-map",
    performance: {
        hints: false
    },
    devServer: {
        port: 3000,
        historyApiFallback: true,
        open: true
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html")
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/bundle.css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
            },
            {
                test: /\.(pdf|png|jpg|jpeg|svg)$/,
                use: ["file-loader"]
            }
        ]
    }
}