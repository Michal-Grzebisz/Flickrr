module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module', // Allows for the use of imports
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier', 'simple-import-sort'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  globals: {},
  rules: {
    'prettier/prettier': 'error',
    'indent': [2, 2, { SwitchCase: 1}],
    'jsx-a11y/click-events-have-key-events': 0,
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/no-explicit-any': 0, // FIXME once we get to know how forms look like or how to define them
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-empty-interface': 0,
    'no-trailing-spaces': 2,
    'react/display-name': 0,
    'react/prop-types': 0,
    'react/jsx-wrap-multilines': [
      2,
      {
        declaration: 'parens',
        assignment: 'parens',
        return: 'parens',
        arrow: 'parens',
        condition: 'parens',
        logical: 'parens',
        prop: false,
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-inferrable-types': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/typedef': 0,
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-useless-constructor': 0,
    semi: [2, 'always'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'comma-dangle': ['error', 'always-multiline'],
  },
};
