import { useContext, useEffect } from 'react';

import { SOCKET_EVENTS } from '@Constants/index';
import {
  NewMessageFromSocket,
  TypingEventPayload,
  UpdateMessageStatusPayload,
} from '@Models/index';
import { WebSocketContext } from '@Providers/index';

import { useReduxForTypingEvent } from './useReduxForTypingEvent';
import { useReduxToAddNewMessage } from './useReduxToAddNewMessage';
import { useReduxToUpdateMessageStatus } from './useReduxToUpdateMessageStatus';

export const useSocket = () => {
  const socket = useContext(WebSocketContext);

  const handleAddNewMessage = useReduxToAddNewMessage();
  const [handleTypingEvent, handleUnTypingEvent] = useReduxForTypingEvent();
  const [handleMessageReceived, handleMessageRead] = useReduxToUpdateMessageStatus();

  useEffect(() => {
    socket
      .off(SOCKET_EVENTS.GET_MESSAGE)
      .on(SOCKET_EVENTS.GET_MESSAGE, (payload: NewMessageFromSocket) => {
        handleAddNewMessage(payload);
      });

    socket.on(SOCKET_EVENTS.TYPING, (payload: TypingEventPayload) => {
      handleTypingEvent(payload);
    });

    socket.on(SOCKET_EVENTS.UN_TYPING, (payload: TypingEventPayload) => {
      handleUnTypingEvent(payload);
    });

    socket.on(SOCKET_EVENTS.RECEIVED_MESSAGE, (payload: UpdateMessageStatusPayload) => {
      handleMessageReceived({ ...payload, status: 'received' });
    });

    socket.on(SOCKET_EVENTS.SEEN_MESSAGE, (payload: UpdateMessageStatusPayload) => {
      handleMessageRead({ ...payload, status: 'seen' });
    });
  }, [
    socket,
    handleAddNewMessage,
    handleTypingEvent,
    handleUnTypingEvent,
    handleMessageReceived,
    handleMessageRead,
    // handleEmitReceivedMessage,å
  ]);

  return socket;
};
