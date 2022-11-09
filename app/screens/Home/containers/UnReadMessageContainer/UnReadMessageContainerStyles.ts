import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { palette, sizes } from '@Themes/index';

interface Styles {
  numberOfUnReadMessageView: ViewStyle;
  numberOfUnReadMessageEqualZeroView: ViewStyle;
  numberOfUnReadMessageText: TextStyle;
  avatar: ImageStyle;
  tick: TextStyle;
}

export const styles = StyleSheet.create<Styles>({
  numberOfUnReadMessageView: {
    backgroundColor: palette.blue,
    height: 26,
    width: 26,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },

  numberOfUnReadMessageEqualZeroView: {
    backgroundColor: palette.white,
  },

  numberOfUnReadMessageText: {
    color: palette.white,
    fontSize: sizes.medium,
  },

  avatar: {
    width: 15,
    height: 15,
    borderRadius: 8,
  },

  tick: {
    color: palette.black,
    fontSize: 14,
  },
});
