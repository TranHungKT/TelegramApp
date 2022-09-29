import { createContext } from 'react';
import socketIO, { Socket } from 'socket.io-client';

import { BASE_URL_SOCKET } from '@Configs/index';

export const socket = socketIO(BASE_URL_SOCKET).connect();

export const WebSocketContext = createContext<Socket>(null as any);
