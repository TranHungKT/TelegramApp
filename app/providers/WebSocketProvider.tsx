import { createContext } from 'react';
import { useCallback } from 'react';
import socketIO, { Socket } from 'socket.io-client';

import { BASE_URL } from '@Configs/index';

export const useInitSocket = (token: string) => {
  const initSocket = useCallback(
    () =>
      socketIO(BASE_URL, {
        path: '/socket',
        transports: ['websocket'],
        auth: {
          token,
        },
        reconnection: true,
      }).connect(),
    [token],
  );

  return initSocket;
};

export const WebSocketContext = createContext<Socket>(null as any);
