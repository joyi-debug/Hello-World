module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 'off',//取消函数前的空格
    'object-curly-spacing': 'off',//取消括号内的间距一致
    'indent': 'off',//取消对每行前空格的检测（该换行还是要换的）
    'quotes': 'off',
    'semi': 'off',
    'comma-dangle': 'off',
    'space-before-blocks': 'off',
    'key-spacing': 'off'
  }
}
