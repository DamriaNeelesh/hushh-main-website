import nextVitals from "eslint-config-next/core-web-vitals";
import unusedImports from "eslint-plugin-unused-imports";

const eslintConfig = [
  ...nextVitals,
  {
    ignores: [
      ".next/**",
      "build/**",
      "coverage/**",
      "node_modules/**",
      "out/**",
      "public/**",
      "content/**/*.tsx",
      "src/content/**/*.tsx",
    ],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_|^[A-Z]",
          args: "after-used",
          argsIgnorePattern: "^_|^(error|err|e|index|idx|props|classprop|token|state)$",
          ignoreRestSiblings: false,
        },
      ],
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-page-custom-font": "off",
      "@next/next/no-img-element": "off",
      "import/no-anonymous-default-export": "off",
      "jsx-a11y/role-supports-aria-props": "off",
      "react/no-children-prop": "off",
      "react/no-unescaped-entities": "off",
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/purity": "off",
      "react-hooks/static-components": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
  {
    files: ["**/*.d.ts"],
    rules: {
      "no-unused-vars": "off",
    },
  },
];

export default eslintConfig;
