module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./app'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@Navigator': './app/navigators',
          '@Screens': './app/screens',
          '@Themes': './app/themes',
        },
      },
    ],
  ],
};
