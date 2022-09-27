import { SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';

import { currentGroupSelector } from '@Stores/groups';

import { styles } from './ChatScreenStyles';
import { Header } from './components/Header';
import { ListChatsContainer } from './containers/ListChatsContainer';

export const ChatScreen = () => {
  const currentGroup = useSelector(currentGroupSelector);
  console.log(currentGroup?.name);
  if (!currentGroup) {
    return <></>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        name={currentGroup.name}
        groupAvatar={currentGroup.groupAvatar}
        totalMembers={currentGroup.members.length}
      />
      <ListChatsContainer />
    </SafeAreaView>
  );
};
