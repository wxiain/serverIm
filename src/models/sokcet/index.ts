import socket, { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

declare let process: {
  env: {
    TOKEN_KEY: string;
  };
};
class Socket {
  private key = process.env.TOKEN_KEY;
  private io: Server;
  constructor(server: HttpServer) {
    this.io = socket.listen(server);
    this.init();
  }
  private init() {
    this.io.sockets.on('connect', (socket) => {
      let query = socket.handshake.query;
      console.log(query);
    });
  }
}

export default Socket;
