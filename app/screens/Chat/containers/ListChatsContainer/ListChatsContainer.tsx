import { useCallback, useContext, useEffect, useState } from 'react';
import { GiftedChat, IChatMessage } from 'react-native-gifted-chat';
import { useSelector, useDispatch } from 'react-redux';

import { PAGE_SIZE } from '@Constants/index';
import { WebSocketContext } from '@Providers/index';
import { fetchListMessages } from '@Services/index';
import { currentGroupSelector } from '@Stores/groups';
import { messagesActions, getMessagesForGroupSelector } from '@Stores/messages';
import { userDataSelector } from '@Stores/user';
import { useQuery } from '@tanstack/react-query';

export const ListChatsContainer = () => {
  const socket = useContext(WebSocketContext);
  const dispatch = useDispatch();

  const [shouldFetchMessage, setShouldFetchMessage] = useState(false);

  const currentGroup = useSelector(currentGroupSelector);
  const { accessToken, _id, firstName, lastName, avatarUrl } = useSelector(userDataSelector);
  const groupMessages = useSelector(getMessagesForGroupSelector);

  const { data } = useQuery(
    ['getListMessages', accessToken, currentGroup?._id],
    () =>
      fetchListMessages({
        token: accessToken,
        pageNumber: 1,
        pageSize: PAGE_SIZE,
        groupId: currentGroup?._id,
      }),
    { enabled: shouldFetchMessage },
  );

  const handleSendMessage = useCallback(
    (newMess: IChatMessage[] = []) => {
      socket.emit('message', {
        roomId: currentGroup?._id,
        message: { text: newMess[0].text, user: _id },
      });
    },
    [_id, currentGroup?._id, socket],
  );

  useEffect(() => {
    if (data && currentGroup?._id) {
      dispatch(
        messagesActions.setMessages({
          count: data.count,
          list: data.list,
          groupId: currentGroup?._id,
        }),
      );
    }
  }, [currentGroup?._id, data, dispatch]);

  useEffect(() => {
    setShouldFetchMessage(!groupMessages);
  }, [groupMessages]);

  return (
    <GiftedChat
      messages={groupMessages?.messages}
      onSend={(newMess) => handleSendMessage(newMess)}
      user={{
        _id,
        name: `${firstName} ${lastName}`,
        avatar: avatarUrl,
      }}
    />
  );
};
