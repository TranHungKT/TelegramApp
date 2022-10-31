import { useReduxToUpdateMessageStatus } from 'hooks/useReduxToUpdateMessageStatus';
import { map } from 'lodash';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { GiftedChat, IMessage, Bubble, BubbleProps } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';

import { SOCKET_EVENTS } from '@Constants/index';
import { SocketErrorPayload } from '@Models/index';
import { WebSocketContext } from '@Providers/index';
import { getCurrentGroupIdSelector } from '@Stores/groups';
import { getMessagesUnSeenByGroupIdSelector } from '@Stores/messages';
import { userDataSelector, userIdSelector } from '@Stores/user';
import { generateName } from '@Utils/index';

import { TypingContainer } from '../TypingContainer';
import { styles } from './SendAndDisplayMessageContainerStyles';

interface SendAndDisplayMessageContainerProps {
  messages?: IMessage[];
}

export const SendAndDisplayMessageContainer = (props: SendAndDisplayMessageContainerProps) => {
  const { messages } = props;
  const socket = useContext(WebSocketContext);

  const userId = useSelector(userIdSelector);
  const currentGroupId = useSelector(getCurrentGroupIdSelector);
  const { _id, firstName, lastName, avatarUrl } = useSelector(userDataSelector);
  const groupMessagesUnSeenSelector = useSelector(getMessagesUnSeenByGroupIdSelector);

  const [isTyping, setIsTyping] = useState(false);

  const [handleUpdateMessageStatus] = useReduxToUpdateMessageStatus();

  const groupMessagesUnSeen = groupMessagesUnSeenSelector({
    groupId: currentGroupId || '',
  });

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
      });

      appendMessageToGiftedChat(newMessages);
    },
    [_id, appendMessageToGiftedChat, currentGroupId, socket],
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

  const renderTicks = (message: IMessage) => {
    if (message.user._id !== _id) {
      return null;
    }

    return (
      <View style={styles.ticksView}>
        {!!message.sent && <Text style={styles.ticks}>✓</Text>}
        {!!message.received && <Text style={styles.ticks}>✓</Text>}
        {!!message.pending && <Text style={styles.ticks}>🕓</Text>}
        {!!message.seen && <Text style={styles.ticks}>✓</Text>}
      </View>
    );
  };

  const renderBubble = (message: BubbleProps<IMessage>) => {
    return <Bubble {...message} renderTicks={renderTicks} />;
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

  useEffect(() => {
    if (groupMessagesUnSeen && groupMessagesUnSeen.length) {
      const groupMessagesUnSeenIds = map(groupMessagesUnSeen, '_id');
      socket.emit(SOCKET_EVENTS.SEEN_MESSAGE, {
        groupId: currentGroupId,
        userId: userId || '',
        messageIds: groupMessagesUnSeenIds,
      });

      handleUpdateMessageStatus({
        groupId: currentGroupId || '',
        messageIds: groupMessagesUnSeenIds as string[],
        status: 'seen',
      });
    }
  }, [currentGroupId, groupMessagesUnSeen, handleUpdateMessageStatus, socket, userId]);

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
      renderBubble={renderBubble}
    />
  );
};
