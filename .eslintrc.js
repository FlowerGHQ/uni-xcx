/** @format */

module.exports = {
  parser: '@typescript-eslint/parser', //定义ESLint的解析器
  extends: [
    'plugin:vue/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/vue'
  ],
  env: {
    node: true
  },
  rules: {
    'new-cap': 'off',
    'no-undef': 'off',
    '@typescript-eslint/no-namespace': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off'
  }
}
