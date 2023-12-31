/**
 * [Eslint] https://eslint.bootcss.com/docs/user-guide/getting-started
 * [配置参考] https://eslint.bootcss.com/docs/rules
 * "off" 或 0 - 关闭规则
 * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
 * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
 */
module.exports = {
  root: true,
  globals: {},
   /**
   * 支持JavaScript 语言选项，配置参考：
   * https://cn.eslint.org/docs/user-guide/configuring#specifying-parser-options
   */
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module",
    allowImportExportEverywhere: false
  },
  /**
   * 预定义的全局变量，配置参考：
   * https://cn.eslint.org/docs/user-guide/configuring#specifying-environments
   */
  env: {
    browser: true,
    node: true,
    es6: true
  },
  // 继承基础配置中的已启用的规则
  extends: ["plugin:vue/recommended", "eslint:recommended"],
  rules: {
   /** YanEr-常用Eslint配置-2020.5.19-start **/
   "vue/max-attributes-per-line": [2,
    {
      singleline: 10,
      multiline: { max: 1, allowFirstLine: false }
    }
   ],
   "indent": [2, 2],
   "jsx-quotes": [2, "prefer-single"],
   "quotes": [2, "single", {
       "avoidEscape": true,
       "allowTemplateLiterals": true
     }
   ],
   "semi": [2, "never"],
   "array-bracket-spacing": [1, "always", {
     "singleValue": false,
     "arraysInArrays": false,
     "objectsInArrays": false
   }],
   "array-element-newline": [1, "consistent"],
   "block-spacing": [1, "always"],
   "comma-spacing": [1, {"before": false, "after": true}],
   "eol-last": 1,
   "func-call-spacing": 1,
   "func-style": [1, "declaration", { "allowArrowFunctions": true }],
   "function-paren-newline": [1, { "minItems": 5 }],
   "implicit-arrow-linebreak": [1, "beside"],
   "key-spacing": 1,
   "keyword-spacing": 1,
   "lines-between-class-members": [1, "always"],
   "new-cap": 1,
   "newline-per-chained-call": [1, { "ignoreChainWithDepth": 4 }],
   "no-multiple-empty-lines": 1,
   "no-trailing-spaces": 1,
   "no-whitespace-before-property": 1,
   "nonblock-statement-body-position": 1,
   "object-curly-newline": 1,
   "object-curly-spacing": 1,
   "sort-vars": 1,
   "space-before-blocks": [1, "always"],
   "space-before-function-paren": 1,
   "space-in-parens": 1,
   "space-infix-ops": 1,
   "space-unary-ops": 1,
   "switch-colon-spacing": 1,
   "template-tag-spacing": ["error", "always"],
   "arrow-body-style": 1,
   "arrow-parens": [1, "as-needed"],
   "arrow-spacing": 1,
   "no-duplicate-imports": 1,
   "no-confusing-arrow": 1,
   "no-useless-constructor": 1,
   "no-useless-rename": 1,
   "symbol-description": 1
   /** YanEr-常用Eslint配置-2020.5.19-end **/
  }
}
