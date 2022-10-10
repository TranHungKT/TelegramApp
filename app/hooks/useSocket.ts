import { useContext, useEffect } from 'react';

import { SOCKET_EVENTS } from '@Constants/index';
import { NewMessageFromSocket, TypingEventPayload } from '@Models/index';
import { WebSocketContext } from '@Providers/index';

import { useReduxForTypingEvent } from './useReduxForTypingEvent';
import { useReduxToAddNewMessage } from './useReduxToAddNewMessage';
import { useReduxToUpdateMessageStatus } from './useReduxToUpdateMessageStatus';

export const useSocket = () => {
  const socket = useContext(WebSocketContext);
  const handleAddNewMessage = useReduxToAddNewMessage();
  const [handleTypingEvent, handleUnTypingEvent] = useReduxForTypingEvent();
  const [handleMessageReceived] = useReduxToUpdateMessageStatus();

  useEffect(() => {
    socket.on(SOCKET_EVENTS.SEND_MESSAGE, (payload: NewMessageFromSocket) => {
      handleAddNewMessage(payload);

      socket.emit(SOCKET_EVENTS.RECEIVED_MESSAGE, {
        groupId: payload.groupId,
        messageId: payload.newMessage._id,
      });
    });

    socket.on(SOCKET_EVENTS.RECEIVED_MESSAGE, (payload) => {
      console.log('ok', payload);
      handleMessageReceived(payload);
    });

    socket.on(SOCKET_EVENTS.TYPING, (payload: TypingEventPayload) => {
      handleTypingEvent(payload);
    });

    socket.on(SOCKET_EVENTS.UN_TYPING, (payload: TypingEventPayload) => {
      handleUnTypingEvent(payload);
    });
  }, [handleAddNewMessage, socket, handleTypingEvent, handleUnTypingEvent, handleMessageReceived]);

  return socket;
};
