const path = require("path");
const { VanillaExtractPlugin } = require("@vanilla-extract/webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  components: "./src/components/index.ts",
  outputPath: "./dist/playroom",
  typescriptFiles: ["src/components/**/*.{ts,tsx}", "!**/node_modules"],

  // Optional:
  title: "My Awesome Library",
  // themes: "./src/themes",
  // snippets: "./playroom/snippets.js",
  // frameComponent: "./playroom/FrameComponent.js",
  // scope: "./playroom/useScope.js",
  widths: [320, 768, 1024],
  port: 9000,
  openBrowser: true,
  paramType: "search", // default is 'hash'
  exampleCode: `
    <Button>
      🧁 Hello, playroom!
    </Button>
  `,
  baseUrl: "/playroom/",
  webpackConfig: () => ({
    // Custom webpack config goes here...
    module: {
      rules: [
        {
          test: /\.(js|ts|tsx)$/,
          exclude: [/node_modules/],
          include: [path.resolve("./src")],
          use: [
            {
              loader: "babel-loader",
              options: {
                babelrc: false,
                presets: [
                  "@babel/preset-typescript",
                  ["@babel/preset-react", { runtime: "automatic" }],
                  [
                    "@babel/preset-env",
                    { targets: { node: 14 }, shippedProposals: true },
                  ],
                ],
                plugins: ["@vanilla-extract/babel-plugin"],
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          exclude: [/node_modules/],
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    plugins: [new MiniCssExtractPlugin(), new VanillaExtractPlugin()],
  }),
  iframeSandbox: "allow-scripts",
};
