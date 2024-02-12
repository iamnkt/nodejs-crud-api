module.exports = {
  extends: [
      'airbnb-base',
      'airbnb-typescript/base'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
      tsconfigRootDir: __dirname,
      project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
      indent: 'off',
      'max-len': ['error', 130],
      '@typescript-eslint/indent': ['error', 2],
      'import/prefer-default-export': 'off',
      'no-return-await': 'off',
      'no-console': 'off',
      "no-unused-expressions": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "class-methods-use-this": "off",
      '@typescript-eslint/return-await': ['error', 'always'],
  }
};