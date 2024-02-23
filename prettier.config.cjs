/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions & import('@ianvs/prettier-plugin-sort-imports').PrettierConfig}  */
const config = {
  singleQuote: false,
  semi: true,
  tabWidth: 2,
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  importOrder: [
    "<BUILT_IN_MODULES>",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^[@][/]",
  ],
  importOrderTypeScriptVersion: "5.0.0",
  tailwindAttributes: [],
  tailwindFunctions: ["cva", "cn"],
  tailwindConfig: "./tailwind.config.ts",
};

module.exports = config;
