import { useCallback, useContext } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useSelector, useDispatch } from 'react-redux';

import { SOCKET_EVENTS } from '@Constants/index';
import { WebSocketContext } from '@Providers/index';
import { getCurrentGroupIdSelector, groupsActions } from '@Stores/groups';
import { messagesActions } from '@Stores/messages';
import { userDataSelector } from '@Stores/user';
import { generateName } from '@Utils/index';

interface SendAndDisplayMessageContainerProps {
  messages?: IMessage[];
}

export const SendAndDisplayMessageContainer = (props: SendAndDisplayMessageContainerProps) => {
  const { messages } = props;
  const socket = useContext(WebSocketContext);
  const dispatch = useDispatch();

  const currentGroupId = useSelector(getCurrentGroupIdSelector);
  const { _id, firstName, lastName, avatarUrl } = useSelector(userDataSelector);

  const handleAddNewMessageToGroup = useCallback(
    (newMess: IMessage) => {
      dispatch(
        messagesActions.addNewMessageToCurrentGroup({
          message: newMess,
          currentGroupId: currentGroupId,
        }),
      );

      dispatch(groupsActions.setLastMessage({ ...newMess, user: newMess.user._id.toString() }));
    },
    [currentGroupId, dispatch],
  );

  const appendMessageToGiftedChat = useCallback(
    (newMess: IMessage[]) => GiftedChat.append(messages, newMess),
    [messages],
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

  socket.off(SOCKET_EVENTS.GET_MESSAGE).on(SOCKET_EVENTS.GET_MESSAGE, (payload: IMessage) => {
    handleAddNewMessageToGroup(payload);
    appendMessageToGiftedChat([payload]);
  });

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMess) => handleSendMessage(newMess)}
      user={{
        _id,
        name: generateName({ firstName, lastName }),
        avatar: avatarUrl,
      }}
    />
  );
};
