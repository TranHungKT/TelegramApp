import { SafeAreaView, View } from 'react-native';

import { styles } from './HomeStyles';
import { Header } from './components';

export const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header />
      </View>
    </SafeAreaView>
  );
};
