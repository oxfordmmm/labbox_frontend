const { parse } = require("postcss");

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "plugin:tailwindcss/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
  plugins: ["react-refresh", "@typescript-eslint", "prettier"],
  overrides: [
    {
      files: ["vite.config.ts"],
      rules: {
        "import/no-extraneous-dependencies": "off",
      },
    },
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react-refresh/only-export-components": "off",
    "no-console": "off",
    "react/jsx-props-no-spreading": "off",
    "import/prefer-default-export": "off",
    "react/require-default-props": [
      "error",
      { ignoreFunctionalComponents: true },
    ],
    "tailwindcss/no-custom-classname": "off",
    "no-param-reassign": "off",

    quotes: ["error", "double"],
    "@typescript-eslint/quotes": ["error", "double"],
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: ["./tsconfig.json", "./tsconfig.node.json"],
      },
    },
  },
};
