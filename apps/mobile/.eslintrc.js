module.exports = {
    extends: [
        '@repo/eslint-config',
        'plugin:react-native/all'
    ],
    plugins: ['react-native'],
    root: true,
    env: {
        'react-native/react-native': true
    },
    rules: {
        'react-native/no-raw-text': 'off',
        'react-native/no-inline-styles': 'warn',
        'react-native/sort-styles': 'warn',
        'react-native/no-color-literals': 'warn',
        'react/no-unescaped-entities': 'warn',
        'no-console': 'warn',
        '@typescript-eslint/no-var-requires': 'warn'
    }
}; 