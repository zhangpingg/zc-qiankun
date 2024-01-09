const { name } = require("./package");
const path = require("path");

module.exports = {
    devServer: {
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
