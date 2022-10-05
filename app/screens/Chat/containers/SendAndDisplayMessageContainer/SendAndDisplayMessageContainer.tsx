import { useCallback, useContext, useEffect } from 'react';
import { useState } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useSelector, useDispatch } from 'react-redux';

import { SOCKET_EVENTS } from '@Constants/index';
import { SocketErrorPayload } from '@Models/index';
import { WebSocketContext } from '@Providers/index';
import { getCurrentGroupIdSelector, groupsActions } from '@Stores/groups';
import { messagesActions } from '@Stores/messages';
import { userDataSelector } from '@Stores/user';
import { generateName } from '@Utils/index';

import { TypingContainer } from '../TypingContainer';

interface SendAndDisplayMessageContainerProps {
  messages?: IMessage[];
}

export const SendAndDisplayMessageContainer = (props: SendAndDisplayMessageContainerProps) => {
  const { messages } = props;
  const socket = useContext(WebSocketContext);
  const dispatch = useDispatch();
  const currentGroupId = useSelector(getCurrentGroupIdSelector);
  const { _id, firstName, lastName, avatarUrl } = useSelector(userDataSelector);

  const [isTyping, setIsTyping] = useState(false);

  const handleAddNewMessageToGroup = useCallback(
    (newMess: IMessage) => {
      dispatch(
        messagesActions.addNewMessageToCurrentGroup({
          newMessage: newMess,
          groupId: currentGroupId,
        }),
      );

      dispatch(
        groupsActions.setLastMessage({
          message: { ...newMess, user: newMess.user._id.toString() },
          groupId: currentGroupId,
        }),
      );
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

  const handleTextInputChanged = (text: string) => {
    socket.emit(text ? SOCKET_EVENTS.TYPING : SOCKET_EVENTS.UN_TYPING, {
      groupId: currentGroupId,
      user: _id,
    });
  };

  const renderFooter = () => {
    return <TypingContainer groupId={currentGroupId || ''} isTyping={isTyping} />;
  };

  useEffect(() => {
    socket.on(SOCKET_EVENTS.SOCKET_ERROR, (payload: SocketErrorPayload) => {
      console.error(payload.type);
    });
    socket.on(SOCKET_EVENTS.TYPING, () => {
      setIsTyping(true);
    });

    socket.on(SOCKET_EVENTS.UN_TYPING, () => {
      setIsTyping(false);
    });
  }, [socket]);

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMess) => handleSendMessage(newMess)}
      user={{
        _id,
        name: generateName({ firstName, lastName }),
        avatar: avatarUrl,
      }}
      renderFooter={renderFooter}
      onInputTextChanged={handleTextInputChanged}
    />
  );
};
