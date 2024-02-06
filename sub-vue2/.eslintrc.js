module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential', // vue2使用
    // 'plugin:vue/vue3-essential', // vue3使用
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
