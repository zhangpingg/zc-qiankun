const { name } = require("./package.json");
const path = require("path");

module.exports = {
    devServer: {
        port: 8081,
        disableHostCheck: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },
    configureWebpack: {
        output: {
            library: `${name}-[name]`,
            libraryTarget: "umd", // 把微应用打包成 umd 库格式
            jsonpFunction: `webpackJsonp_${name}`,
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
            },
        },
    },
};
