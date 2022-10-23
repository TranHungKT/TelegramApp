import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { palette, sizes } from '@Themes/index';

interface Styles {
  numberOfUnReadMessageView: ViewStyle;
  numberOfUnReadMessageEqualZeroView: ViewStyle;
  numberOfUnReadMessageText: TextStyle;
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
});
