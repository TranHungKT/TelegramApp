import { map } from 'lodash';
import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchListMessages } from 'services';
import { messagesActions } from 'stores/messages';
import { IMAGES } from 'themes';

import { PAGE_SIZE, SOCKET_EVENTS } from '@Constants/index';
import { Group as IGroup } from '@Models/index';
import { AllGroupChatNavigationParamList } from '@Navigators/index';
import { WebSocketContext } from '@Providers/index';
import { groupsActions, getNumberOfUnReadMessagesSelector } from '@Stores/groups';
import { useAppDispatch } from '@Stores/index';
import { userIdSelector, userTokenSelector } from '@Stores/user';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';

import { Group } from '../../components/Group';

interface GroupContainerProps {
  group: IGroup;
}

export const GroupContainer = (props: GroupContainerProps) => {
  const { group } = props;
  const { members } = group;
  const dispatch = useAppDispatch();
  const socket = useContext(WebSocketContext);
  const accessToken = useSelector(userTokenSelector);
  const userId = useSelector(userIdSelector);

  const unReadMessageSelector = useSelector(getNumberOfUnReadMessagesSelector);

  const numberOfUnReadMessage = unReadMessageSelector({ groupId: group._id });

  const navigation =
    useNavigation<NativeStackNavigationProp<AllGroupChatNavigationParamList, 'AllMessageScreen'>>();

  const { data: listMessages } = useQuery(['fetchListMessages', group._id], () =>
    fetchListMessages({
      token: accessToken,
      pageNumber: 1,
      pageSize: PAGE_SIZE,
      groupId: group._id,
    }),
  );

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

  const handleSendReadMessagesEvent = () => {
    if (numberOfUnReadMessage) {
      socket.emit(SOCKET_EVENTS.READ_MESSAGE, {
        groupId: group._id,
        userId,
      });
      dispatch(
        groupsActions.updateUnReadMessages({ groupId: group._id, numberOfUnReadMessage: 0 }),
      );
    }
  };

  const handleClickGroup = () => {
    dispatch(groupsActions.setCurrentGroupId(group._id));
    handleSendReadMessagesEvent();

    navigation.navigate('ChatScreen');
  };

  useEffect(() => {
    if (listMessages && listMessages.list.length) {
      const unReceivedMessage = listMessages.list.filter((message) => !message.received);

      socket.emit(SOCKET_EVENTS.RECEIVED_MESSAGE, {
        groupId: group._id,
        messageIds: map(unReceivedMessage, '_id'),
      });
    }
  }, [group._id, listMessages, socket]);

  useEffect(() => {
    if (listMessages) {
      dispatch(
        messagesActions.setMessages({
          count: listMessages.count,
          list: listMessages.list,
          groupId: listMessages.groupId,
        }),
      );
    }
  }, [dispatch, listMessages]);

  return (
    <Group
      group={{ ...group, name: generateGroupName(), groupAvatar: getAvatarUrl() }}
      onClickGroup={handleClickGroup}
      numberOfUnReadMessage={numberOfUnReadMessage}
    />
  );
};
