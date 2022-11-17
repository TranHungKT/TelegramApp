import { SafeAreaView } from 'react-native';

import { styles } from './GroupChatInformationScreenStyles';
import { Header } from './components';

export const GroupChatInformationScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
    </SafeAreaView>
  );
};
