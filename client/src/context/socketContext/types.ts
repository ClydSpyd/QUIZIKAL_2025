import { Socket } from "socket.io-client";

export interface SocketContextData {
  socket: Socket;
  connectedUsers: SocketUser[];
  error: string | null;
}

export const defaultContextData: SocketContextData = {
  socket: {} as Socket,
  connectedUsers: [],
  error: null
};
