import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { palette, sizes, spacing } from 'themes';

interface Styles {
  container: ViewStyle;
  groupView: ViewStyle;
  groupName: TextStyle;
  chat: TextStyle;
  avatar: ViewStyle;
  rightCol: ViewStyle;
  lastUpdatedTime: TextStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    flexDirection: 'row',
    marginBottom: spacing.large,
  },

  groupView: {
    flex: 6,
    paddingTop: 5,
    paddingBottom: 5,
  },

  groupName: {
    fontSize: 23,
    fontWeight: 'bold',
  },

  avatar: {
    marginRight: spacing.mediumPlus,
    flex: 2,
    backgroundColor: palette.white,
    resizeMode: 'contain',
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
});
