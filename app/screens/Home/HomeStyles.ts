import { StyleSheet, ViewStyle } from 'react-native';

import { COMMON_STYLES } from '@Constants/index';
import { paddingHorizontalSpace } from '@Themes/index';

interface Styles {
  safeArea: ViewStyle;
  container: ViewStyle;
  content: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  safeArea: {
    ...COMMON_STYLES.safeArea,
  },
  container: {
    paddingHorizontal: paddingHorizontalSpace,
  },
  content: {
    marginTop: 60,
  },
});
