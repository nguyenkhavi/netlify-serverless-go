/** @type {import("prettier").Config} */
const config = {
  semi: false,
  printWidth: 100,
  singleQuote: true,
  trailingComma: "all",
  arrowParens: "always",
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
};

module.exports = config;
