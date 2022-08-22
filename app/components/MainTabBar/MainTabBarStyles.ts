import { StyleSheet, ViewStyle } from 'react-native';

import { paddingHorizontalSpace } from '@Themes/index';

interface Style {
  container: ViewStyle;
}

export const styles = StyleSheet.create<Style>({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    top: 100,
    left: paddingHorizontalSpace,
    width: '100%',
    alignContent: 'center',
    alignSelf: 'center',
  },
});
