/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions & import('@ianvs/prettier-plugin-sort-imports').PrettierConfig}  */
const config = {
  singleQuote: false,
  semi: true,
  tabWidth: 2,
  plugins: ["prettier-plugin-tailwindcss"],
  importOrder: [
    "<BUILT_IN_MODULES>",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^[@][/]",
    "",
    "^(?!.*[.]css$)[./].*$",
    ".css$",
  ],
  importOrderTypeScriptVersion: "5.0.0",
  tailwindAttributes: [],
  tailwindFunctions: ["cva", "cn"],
};

module.exports = config;
