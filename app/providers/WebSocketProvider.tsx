import { createContext, PropsWithChildren } from 'react';
import socketIO, { Socket } from 'socket.io-client';

const WebSocketContext = createContext<Socket>(null as any);

export { WebSocketContext };

export default ({ children }: PropsWithChildren<{}>) => {
  const socket = socketIO('http://localhost:3001');
  socket.connect();

  return <WebSocketContext.Provider value={socket}>{children}</WebSocketContext.Provider>;
};
