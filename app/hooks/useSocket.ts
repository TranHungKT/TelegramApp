import { useContext, useEffect } from 'react';

import { SOCKET_EVENTS } from '@Constants/index';
import { NewMessageFromSocket, ReadMessagePayload, TypingEventPayload } from '@Models/index';
import { WebSocketContext } from '@Providers/index';

import { useReduxForReadMessageStatus } from './useReduxForReadMessageStatus';
import { useReduxForTypingEvent } from './useReduxForTypingEvent';
import { useReduxToAddNewMessage } from './useReduxToAddNewMessage';
import { useReduxToUpdateMessageStatus } from './useReduxToUpdateMessageStatus';

export const useSocket = () => {
  const socket = useContext(WebSocketContext);
  const handleAddNewMessage = useReduxToAddNewMessage();
  const [handleTypingEvent, handleUnTypingEvent] = useReduxForTypingEvent();
  const [handleMessageReceived] = useReduxToUpdateMessageStatus();
  const [handleMessageRead] = useReduxForReadMessageStatus();

  useEffect(() => {
    socket.on(SOCKET_EVENTS.GET_MESSAGE, (payload: NewMessageFromSocket) => {
      socket.emit(SOCKET_EVENTS.RECEIVED_MESSAGE, {
        groupId: payload.groupId,
        messageId: payload.newMessage._id,
      });
      handleAddNewMessage(payload);
    });

    socket.on(SOCKET_EVENTS.RECEIVED_MESSAGE, (payload) => {
      handleMessageReceived(payload);
    });

    socket.on(SOCKET_EVENTS.TYPING, (payload: TypingEventPayload) => {
      handleTypingEvent(payload);
    });

    socket.on(SOCKET_EVENTS.UN_TYPING, (payload: TypingEventPayload) => {
      handleUnTypingEvent(payload);
    });

    socket.on(SOCKET_EVENTS.READ_MESSAGE, (payload: ReadMessagePayload) => {
      handleMessageRead(payload);
    });
  }, [
    socket,
    handleAddNewMessage,
    handleTypingEvent,
    handleUnTypingEvent,
    handleMessageReceived,
    handleMessageRead,
  ]);

  return socket;
};
