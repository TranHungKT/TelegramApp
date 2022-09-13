import { createContext, PropsWithChildren } from 'react';
import socketIO, { Socket } from 'socket.io-client';

import { BASE_URL_SOCKET } from '@Configs/index';

const WebSocketContext = createContext<Socket>(null as any);

export { WebSocketContext };

export default ({ children }: PropsWithChildren<{}>) => {
  const socket = socketIO(BASE_URL_SOCKET);
  socket.connect();

  return <WebSocketContext.Provider value={socket}>{children}</WebSocketContext.Provider>;
};
