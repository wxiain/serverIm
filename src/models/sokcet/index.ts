import socket, { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

import analysisToken from '../../middlewares/jwt/analysisToken';

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
      let tokenCheckResult = analysisToken(query.token);
      if (tokenCheckResult.statusCode === 401) {
        socket.disconnect(true); // 主动关闭该次socket连接, 在这之前, 可以做一些socket提示
      }
    });
  }
}

export default Socket;
