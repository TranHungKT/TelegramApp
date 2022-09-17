import { useEffect, useState, useCallback, useContext } from 'react';
import { GiftedChat, IChatMessage } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';
import { currentGroupSelector } from 'stores/groups';

import { WebSocketContext } from '@Providers/index';

export const ListChatsContainer = () => {
  const [messages, setMessages] = useState<IChatMessage[]>([]);

  const socket = useContext(WebSocketContext);
  const currentGroup = useSelector(currentGroupSelector);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback(
    (newMess: IChatMessage[] = []) => {
      setMessages((previousMessages: IChatMessage[]): any =>
        GiftedChat.append(previousMessages, newMess),
      );
      socket.emit('message', {
        roomId: currentGroup?._id,
        message: { text: newMess[0].text, user: currentGroup?.members[0]._id },
      });
    },
    [currentGroup?._id, currentGroup?.members, socket],
  );

  socket.on('message', (payload) => console.log('heye', payload));

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMess: any) => onSend(newMess)}
      user={{
        _id: 2,
      }}
    />
  );
};
