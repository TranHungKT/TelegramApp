import { SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { currentGroupSelector, groupsActions } from '@Stores/groups';

import { styles } from './ChatScreenStyles';
import { Header } from './components/Header';
import { ListChatsContainer } from './containers/ListChatsContainer';

export const ChatScreen = () => {
  const currentGroup = useSelector(currentGroupSelector);
  const dispatch = useDispatch();

  const handleClickGoBack = () => {
    dispatch(groupsActions.setCurrentGroupId(''));
  };

  if (!currentGroup) {
    return <></>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        name={currentGroup.name}
        groupAvatar={currentGroup.groupAvatar}
        totalMembers={currentGroup.members.length}
        onClickGoBack={handleClickGoBack}
      />
      <ListChatsContainer />
    </SafeAreaView>
  );
};
