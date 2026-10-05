"use strict";

// Babel 7 configuration (replaces the Babel 6 `babel-preset-react-app` setup).
// The same config is used by webpack (via babel-loader) and by Jest
// (via babel-jest), so it lives at the project root.
module.exports = {
  presets: [
    [
      require.resolve("@babel/preset-env"),
      {
        targets: {
          browsers: [">1%", "last 4 versions", "Firefox ESR", "not ie < 9"]
        }
      }
    ],
    [require.resolve("@babel/preset-react"), { runtime: "classic" }],
    require.resolve("@babel/preset-flow")
  ],
  plugins: [],
  env: {
    test: {
      presets: [
        [require.resolve("@babel/preset-env"), { targets: { node: "current" } }],
        [require.resolve("@babel/preset-react"), { runtime: "classic" }],
        require.resolve("@babel/preset-flow")
      ]
    }
  }
};