import { useReduxToUpdateMessageStatus } from 'hooks/useReduxToUpdateMessageStatus';
import { map } from 'lodash';
import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { PAGE_SIZE, SOCKET_EVENTS } from '@Constants/index';
import { Group as IGroup } from '@Models/index';
import { AllGroupChatNavigationParamList } from '@Navigators/index';
import { WebSocketContext } from '@Providers/index';
import { fetchListMessages } from '@Services/index';
import { groupsActions, getNumberOfUnReadMessagesSelector } from '@Stores/groups';
import { useAppDispatch } from '@Stores/index';
import { getMessagesUnReceivedByGroupIdSelector, messagesActions } from '@Stores/messages';
import { userIdSelector, userTokenSelector } from '@Stores/user';
import { IMAGES } from '@Themes/index';
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
  const groupMessagesUnReceivedSelector = useSelector(getMessagesUnReceivedByGroupIdSelector);

  const numberOfUnReadMessage = unReadMessageSelector({ groupId: group._id });
  const groupMessagesUnReceived = groupMessagesUnReceivedSelector({ groupId: group._id });

  const [handleUpdateMessageStatus] = useReduxToUpdateMessageStatus();

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

  const handleClickGroup = () => {
    dispatch(groupsActions.setCurrentGroupId(group._id));

    navigation.navigate('ChatScreen');
  };

  useEffect(() => {
    if (groupMessagesUnReceived && groupMessagesUnReceived.length) {
      const groupMessagesUnReceivedIds = map(groupMessagesUnReceived, '_id');
      socket.emit(SOCKET_EVENTS.RECEIVED_MESSAGE, {
        groupId: group._id,
        messageIds: groupMessagesUnReceivedIds,
      });

      handleUpdateMessageStatus({
        groupId: group._id,
        messageIds: groupMessagesUnReceivedIds as string[],
        status: 'received',
      });
    }
  }, [group._id, groupMessagesUnReceived, handleUpdateMessageStatus, socket]);

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
