import { SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { LoadingComponent } from '@Components/index';
import { AllGroupChatNavigationParamList } from '@Navigators/index';
import { currentGroupSelector, groupsActions } from '@Stores/groups';
import { getUserStatusByIdSelector, userIdSelector } from '@Stores/user';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { styles } from './ChatScreenStyles';
import { Header } from './components/Header';
import { ListChatsContainer } from './containers/ListChatsContainer';

export const ChatScreen = () => {
  const currentGroup = useSelector(currentGroupSelector);
  const userId = useSelector(userIdSelector);
  const dispatch = useDispatch();

  const navigation =
    useNavigation<NativeStackNavigationProp<AllGroupChatNavigationParamList, 'ChatScreen'>>();

  const handleClickGoBack = () => {
    dispatch(groupsActions.setCurrentGroupId(''));
  };

  const otherMember = currentGroup?.members.filter((member) => member._id !== userId);

  const userStatusSelector = useSelector(getUserStatusByIdSelector);
  const userStatus = userStatusSelector({ userId: otherMember ? otherMember[0]._id : '' });

  const handleClickName = () => {
    navigation.navigate('GroupChatInformationScreen');
  };

  if (!currentGroup) {
    return <LoadingComponent />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        name={currentGroup.name}
        groupAvatar={currentGroup.groupAvatar}
        totalMembers={currentGroup.members.length}
        onClickGoBack={handleClickGoBack}
        userStatus={userStatus}
        onClickName={handleClickName}
      />
      <ListChatsContainer />
    </SafeAreaView>
  );
};
