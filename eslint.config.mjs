import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['node_modules/', 'dist/', 'build/', '**/*.mjs'],
  },
  {
    files: ['**/*.{ts, tsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    extends: [
      pluginJs.configs.recommended,
      ...tseslint.configs.recommended,
      prettier,
    ],
    rules: {
      "require-await": "error",
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }], // 未使用変数はエラー、アンダースコアで始まる引数は無視
      "no-console": ["warn", { "allow": ["warn", "error"] }], // console.logを警告、console.warnとconsole.errorは許可
      "eqeqeq": ["error", "always"], // 厳密な等価演算子 (===) の使用を強制
      "no-var": "error", // varキーワードの使用を禁止
      "prefer-const": "error", // 再代入されない変数はconstを強制
      "@typescript-eslint/consistent-type-imports": "error", // 型のインポートを一貫させる
    },
  }
);
