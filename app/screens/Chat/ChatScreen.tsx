import { SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';

import { currentGroupSelector } from '@Stores/groups';

import { styles } from './ChatScreenStyles';
import { Header } from './components/Header';

export const ChatScreen = () => {
  const currentGroup = useSelector(currentGroupSelector);

  console.log(currentGroup);

  if (!currentGroup) {
    return <></>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header name={currentGroup.name} groupAvatar={currentGroup.groupAvatar as string} />
    </SafeAreaView>
  );
};
