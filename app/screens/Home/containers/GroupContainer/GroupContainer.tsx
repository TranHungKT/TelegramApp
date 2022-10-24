import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { IMAGES } from 'themes';

import { SOCKET_EVENTS } from '@Constants/index';
import { Group as IGroup } from '@Models/index';
import { AllGroupChatNavigationParamList } from '@Navigators/index';
import { WebSocketContext } from '@Providers/index';
import { groupsActions, getNumberOfUnReadMessagesSelector } from '@Stores/groups';
import { useAppDispatch } from '@Stores/index';
import { userIdSelector } from '@Stores/user';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Group } from '../../components/Group';

interface GroupContainerProps {
  group: IGroup;
}

export const GroupContainer = (props: GroupContainerProps) => {
  const { group } = props;
  const { members } = group;
  const dispatch = useAppDispatch();
  const socket = useContext(WebSocketContext);

  const userId = useSelector(userIdSelector);
  const unReadMessageSelector = useSelector(getNumberOfUnReadMessagesSelector);

  const numberOfUnReadMessage = unReadMessageSelector({ groupId: group._id });

  const navigation =
    useNavigation<NativeStackNavigationProp<AllGroupChatNavigationParamList, 'AllMessageScreen'>>();

  const generateGroupName = () => {
    let name = '';
    members.forEach((member) => {
      if (member._id !== userId) {
        name = name + `,${member.firstName} ${member.lastName}`;
      }
    });

    return name.substring(1);
  };

  const getAvatarUrl = () => {
    if (members.length === 2) {
      return members.filter((member) => member._id !== userId)[0].avatarUrl;
    }
    return IMAGES.Group;
  };

  const handleClickGroup = () => {
    dispatch(groupsActions.setCurrentGroupId(group._id));
    // TODO: Update this function just run when there is unread message
    socket.emit(SOCKET_EVENTS.READ_MESSAGE, {
      groupId: group._id,
      userId,
    });
    dispatch(groupsActions.updateUnReadMessages({ groupId: group._id, numberOfUnReadMessage: 0 }));
    // TODO: Update this function just run when there is unread message
    navigation.navigate('ChatScreen');
  };

  return (
    <Group
      group={{ ...group, name: generateGroupName(), groupAvatar: getAvatarUrl() }}
      onClickGroup={handleClickGroup}
      numberOfUnReadMessage={numberOfUnReadMessage}
    />
  );
};
