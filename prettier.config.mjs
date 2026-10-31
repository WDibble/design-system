/** @type {import("prettier").Config} */
export default {
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  printWidth: 100,
  plugins: ["prettier-plugin-tailwindcss"],
  // Explicitly points the plugin to the Tailwind v4 CSS entry point
  tailwindStylesheet: "./src/index.css",
  tailwindFunctions: ["cn", "cva", "clsx"],
};
