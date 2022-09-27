import { useCallback, useContext, useEffect, useState } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useSelector, useDispatch } from 'react-redux';

import { PAGE_SIZE, SOCKET_EVENTS } from '@Constants/index';
import { WebSocketContext } from '@Providers/index';
import { fetchListMessages } from '@Services/index';
import { getCurrentGroupIdSelector } from '@Stores/groups';
import { messagesActions, getMessagesForGroupSelector } from '@Stores/messages';
import { userDataSelector } from '@Stores/user';
import { generateName } from '@Utils/index';
import { useQuery } from '@tanstack/react-query';

export const ListChatsContainer = () => {
  const socket = useContext(WebSocketContext);
  const dispatch = useDispatch();

  const [shouldFetchMessage, setShouldFetchMessage] = useState(false);

  const currentGroupId = useSelector(getCurrentGroupIdSelector);
  const { accessToken, _id, firstName, lastName, avatarUrl } = useSelector(userDataSelector);
  const groupMessages = useSelector(getMessagesForGroupSelector);

  const { data } = useQuery(
    ['getListMessages', accessToken, currentGroupId],
    () =>
      fetchListMessages({
        token: accessToken,
        pageNumber: 1,
        pageSize: PAGE_SIZE,
        groupId: currentGroupId,
      }),
    { enabled: shouldFetchMessage },
  );

  const handleAddNewMessageToGroup = useCallback(
    (newMess: IMessage) => {
      dispatch(
        messagesActions.addNewMessageToCurrentGroup({
          message: newMess,
          currentGroupId: currentGroupId,
        }),
      );
    },
    [currentGroupId, dispatch],
  );

  const appendMessageToGiftedChat = useCallback(
    (newMess: IMessage[]) => GiftedChat.append(groupMessages?.messages, newMess),
    [groupMessages?.messages],
  );

  const handleSendMessage = useCallback(
    (newMessages: IMessage[] = []) => {
      newMessages.forEach((newMessage) => {
        socket.emit(SOCKET_EVENTS.SEND_MESSAGE, {
          roomId: currentGroupId,
          message: { text: newMessage.text, user: _id },
        });

        handleAddNewMessageToGroup({
          ...newMessage,
          createdAt: newMessage.createdAt.toString() as any,
        });
      });

      appendMessageToGiftedChat(newMessages);
    },
    [_id, appendMessageToGiftedChat, currentGroupId, handleAddNewMessageToGroup, socket],
  );

  useEffect(() => {
    if (data && currentGroupId) {
      dispatch(
        messagesActions.setMessages({
          count: data.count,
          list: data.list,
          groupId: currentGroupId,
        }),
      );
    }
  }, [currentGroupId, data, dispatch]);

  useEffect(() => {
    setShouldFetchMessage(!groupMessages);
  }, [groupMessages]);

  socket.off(SOCKET_EVENTS.GET_MESSAGE).on(SOCKET_EVENTS.GET_MESSAGE, (payload: IMessage) => {
    handleAddNewMessageToGroup(payload);
    appendMessageToGiftedChat([payload]);
  });

  return (
    <GiftedChat
      messages={groupMessages?.messages}
      onSend={(newMess) => handleSendMessage(newMess)}
      user={{
        _id,
        name: generateName({ firstName, lastName }),
        avatar: avatarUrl,
      }}
    />
  );
};
