module.exports = {
  parserOptions: {},
  plugins: [],
  globals: {
    document: false,
    localStorage: false,
    fetch: false,
    alert: false,
    window: false,
    React$Element: false,
    ReactClass: false,
    API_HOST: false,
    FormData: false,
    Image: false,
    S3_ZONE: false,
    S3_BUCKET: false,
    location: false,
  },
  extends: ['airbnb-base'],
  rules: {
    // Indent with 2 spaces
    indent: ['error', 2],
    'import/no-useless-path-segments': 'off',
  },
  settings: {},
};
