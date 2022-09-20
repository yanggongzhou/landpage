/* eslint-disable  */
module.exports = {
    root: true,
    env: {
      node: true,
      browser: true,
      es6: true,
    },
    "globals": {
      "$": "readonly",
    },
    parserOptions: {
      sourceType: 'module'
    },
    rules: {
      'no-var': 1, //不使用var
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'indent': [
        'warn', 2, { SwitchCase: 1 }
      ], // 强制使用一致的缩进
      'eqeqeq': [2, 'always'], // 要求使用 === 和 !==
      'semi': [0, 'always'],
      "no-extra-semi": 2, //禁止多余的冒号
      "no-fallthrough": 1, //禁止switch穿透
      "prefer-const": 1, //授权const
      "prefer-spread": 0, //首选展开运算
      "prefer-reflect": 0, //首选Reflect的方法
      'no-unused-vars': 1, //不能有声明后未被使用的变量或参数
      'no-dupe-args': 'error',
      'no-undefined': 'warn',
      'no-undef': [
        'error',
        {
          typeof: false
        }
      ],
      'max-lines': ['error', { max: 300 } ],
      "no-return-await": 'off',
      // allow async-await
      'generator-star-spacing': 'off',
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      camelcase: 'off',
      'object-property-newline': 'off',
      'object-curly-newline': 'off',
      quotes: ['off', 'single', { allowTemplateLiterals: true }],
      'no-use-before-define': 'off',
      'no-void': 'off',
      'comma-dangle': 'off',
      'space-before-function-paren': 0,
      'array-bracket-spacing': 'off',
      'no-trailing-spaces': 'off',
      'padded-blocks': 'off',
      'eol-last': 'off',
    }
  };
