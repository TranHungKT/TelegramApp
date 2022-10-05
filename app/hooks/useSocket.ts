import { useContext, useEffect } from 'react';

import { SOCKET_EVENTS } from '@Constants/index';
import { NewMessageFromSocket, TypingEventPayload } from '@Models/index';
import { WebSocketContext } from '@Providers/index';

import { useReduxForTypingEvent } from './useReduxForTypingEvent';
import { useReduxToAddNewMessage } from './useReduxToAddNewMessage';

export const useSocket = () => {
  const socket = useContext(WebSocketContext);
  const handleAddNewMessage = useReduxToAddNewMessage();
  const [handleTypingEvent] = useReduxForTypingEvent();

  useEffect(() => {
    socket.on(SOCKET_EVENTS.GET_MESSAGE, (payload: NewMessageFromSocket) => {
      handleAddNewMessage(payload);
    });

    socket.on(SOCKET_EVENTS.TYPING, (payload: TypingEventPayload) => {
      handleTypingEvent(payload);
    });
  }, [handleAddNewMessage, socket, handleTypingEvent]);

  return socket;
};
