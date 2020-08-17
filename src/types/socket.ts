import { Socket } from 'socket.io';

export interface UserOnlineParams {
  userId: number;
  socket: Socket;
  socketId: string;
  query: any;
  receiveId?: number;
}

export interface UserOnline {
  [key: number]: UserOnlineParams;
}
