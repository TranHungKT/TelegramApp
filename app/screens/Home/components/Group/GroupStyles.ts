import { StyleSheet, TextStyle, ViewStyle, ImageStyle } from 'react-native';

import { palette, sizes, spacing } from '@Themes/index';

interface Styles {
  container: ViewStyle;
  groupView: ViewStyle;
  groupName: TextStyle;
  chat: TextStyle;
  avatar: ImageStyle;
  rightCol: ViewStyle;
  lastUpdatedTime: TextStyle;
  numberOfUnReadMessageView: ViewStyle;
  numberOfUnReadMessageText: TextStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    flexDirection: 'row',
    marginBottom: spacing.large,
    alignItems: 'center',
  },

  groupView: {
    flex: 8,
    paddingTop: 5,
    paddingBottom: 5,
  },

  groupName: {
    fontSize: 23,
    fontWeight: 'bold',
  },

  avatar: {
    marginRight: spacing.mediumPlus,
    backgroundColor: palette.white,
    width: 82,
    height: 82,
    borderRadius: 23,
  },

  rightCol: {
    flex: 2,
    paddingTop: 7,
    paddingBottom: 7,
    alignItems: 'flex-end',
  },

  chat: {
    fontSize: sizes.medium,
    color: palette.lightGrey,
    marginTop: 5,
  },

  lastUpdatedTime: {
    fontSize: 17,
    color: palette.lightGrey,
  },

  numberOfUnReadMessageView: {
    backgroundColor: palette.blue,
    height: 26,
    width: 26,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },

  numberOfUnReadMessageText: {
    color: palette.white,
    fontSize: sizes.medium,
  },
});
