import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { palette, sizes, paddingHorizontalSpace } from '@Themes/index';

interface Styles {
  container: ViewStyle;
  firstColumn: ViewStyle;
  avatar: ImageStyle;
  groupNameView: ViewStyle;
  groupName: TextStyle;
  status: TextStyle;
  profileIconView: ViewStyle;
  profileIconRow: ViewStyle;
  profileIcon: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: paddingHorizontalSpace,
  },

  firstColumn: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 23,
  },

  groupName: {
    fontWeight: 'bold',
    fontSize: sizes.big,
  },

  groupNameView: {
    marginLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'space-between',
  },

  status: {
    color: palette.blue,
    fontSize: sizes.medium,
  },

  profileIconView: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
  },

  profileIconRow: {
    flexDirection: 'row',
  },

  profileIcon: {
    margin: -10,
    color: palette.blue,
  },
});
