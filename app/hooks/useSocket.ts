import { useContext, useEffect } from 'react';

import { SOCKET_EVENTS } from '@Constants/index';
import { WebSocketContext } from '@Providers/index';

import { useReduxToAddNewMessage } from './useReduxToAddNewMessage';

export const useSocket = () => {
  const socket = useContext(WebSocketContext);
  const handleAddNewMessage = useReduxToAddNewMessage();

  useEffect(() => {
    socket.on(SOCKET_EVENTS.GET_MESSAGE, (payload) => {
      handleAddNewMessage(payload);
    });
  }, [handleAddNewMessage, socket]);

  return socket;
};
