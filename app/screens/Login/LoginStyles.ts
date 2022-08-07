import { ViewStyle, StyleSheet } from 'react-native';

interface Styles {
  container: ViewStyle;
  button: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
  },
  button: {
    marginTop: 100,
  },
});
