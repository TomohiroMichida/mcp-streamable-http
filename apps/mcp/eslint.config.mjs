import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

import rootConfig from "../../eslint.config.mjs";
import tsParser from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

export default [
  ...rootConfig, // rootの設定を継承
  ...compat.extends("next/core-web-vitals"),
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: [path.join(__dirname, "tsconfig.json")],
        tsconfigRootDir: __dirname,
      }
    },
    rules: {
      // ここにwebアプリ固有のルールを追加
    },
  },
];
