import { StyleSheet, ViewStyle, ImageStyle } from 'react-native';

import { palette } from '@Themes/index';

interface Styles {
  container: ViewStyle;
  contentContainerStyle: ViewStyle;
  image: ImageStyle;
  blankView: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    backgroundColor: palette.white,
    paddingHorizontal: 10,
  },

  contentContainerStyle: {
    justifyContent: 'space-between',
    width: '100%',
  },

  image: {
    width: 115,
    height: 115,
    borderRadius: 30,
    margin: 5,
  },

  blankView: {
    height: 80,
    backgroundColor: palette.white,
  },
});
