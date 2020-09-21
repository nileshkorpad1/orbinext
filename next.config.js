const withPlugins = require("next-compose-plugins");
const withCSS = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
// const withImages = require("next-images");
const Dotenv = require("dotenv-webpack");

const withBundleAnalyzer = require("@next/bundle-analyzer");

const nextConfig = {
    analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
        server: {
            analyzerMode: "static",
            reportFilename: "../bundles/server.html",
        },
        browser: {
            analyzerMode: "static",
            reportFilename: "../bundles/client.html",
        },
    },
    // webpack(config) {
        // config.module.rules.push({
        //     test: /\.(woff|woff2|eot|ttf|otf)$/,
        //     use: [
        //         {
        //             loader: "url-loader",
        //             options: {
        //                 esModule: false,
        //             },
        //         },
        //     ],
        // });
    //     config.plugins.push(
    //         new Dotenv({
    //             silent: true,
    //         })
    //     );
    //     return config;
    // },
};

module.exports = withPlugins(
    [[withCSS], [withSass], [withBundleAnalyzer]],
    nextConfig
);
