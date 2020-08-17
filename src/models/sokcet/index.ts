import socket, { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';

import { UserOnlineParams, UserOnline } from '../../types/socket';

import analysisToken from '../../middlewares/jwt/analysisToken';
import db from '../../database/db';

declare let process: {
  env: {
    TOKEN_KEY: string;
  };
};
class Io {
  key = process.env.TOKEN_KEY;
  userOnline: UserOnline = {};
  io: Server;
  constructor(server: HttpServer) {
    this.io = socket.listen(server);
    this.init();
  }
  init() {
    this.io.sockets.on('connect', (socket) => {
      let query = socket.handshake.query;
      let socketId = socket.id;
      let tokenCheckResult = analysisToken(query.token);
      if (tokenCheckResult.statusCode === 401) {
        socket.emit('errors', { message: 'token无效或未登录', status: false });
        socket.disconnect(true); // 主动关闭该次socket连接, 在这之前, 可以做一些socket提示
        return;
      }
      this.send(socketId, socket);
      let userId = Number(tokenCheckResult.userId);
      // 初始化存入数据
      this.processUserOnline({
        socket,
        query,
        socketId: socket.id,
        userId
      });
      this.disconnect(userId, socket);
      this.receiveRead(socket);
    });
  }
  send(id: string, socket: Socket) {
    socket.on('send', (data) => {
      // 接受消息
      this.receive(socket, data);
      this.saveMessage(data);
      this.processUserOnline(data); // 修改已经初始化的数据
    });
  }
  saveMessage({ message, receiveId, sendId }: { message: string; receiveId: number; sendId: number }) {
    db(`INSERT INTO messages (message,userId,sendId) VALUES ('${message}',${receiveId},${sendId})`).catch((err) => {
      console.log(err);
    });
    db(
      `INSERT INTO links (message,userId,sendId) VALUES ('${message}',${receiveId},${sendId}) ON DUPLICATE KEY UPDATE message='${message}',unread_count=IF(unread_count IS NULL, 1, unread_count+1)`
    ).catch((err) => {
      console.log(err);
    });
  }
  receiveRead(socket: Socket) {
    socket.on('receive.read', ({ receiveId, sendId }: { receiveId: number; sendId: number }) => {
      let socketId = this.isOnline(receiveId);
      // 需要访问下数据库, 更新unread_count, 这里客户端要控制好节流, 不能每次都到服务端来
      db(`UPDATE links SET unread_cound=0 WHERE sendId=${sendId},userId=${receiveId}`).catch((err) => {
        console.log(err);
      });
      if (!socketId) return;
      socket.to(socketId).emit('send.read');
    });
  }
  disconnect(userId: number, socket: Socket) {
    // 断开连接
    socket.on('disconnect', () => {
      Reflect.deleteProperty(this.userOnline, userId);
    });
  }
  receive(socket: Socket, data: UserOnlineParams) {
    let socketId = this.isOnline(Number(data.receiveId));
    if (!socketId) return;
    socket.to(socketId).emit('receive', data);
  }
  isOnline(id: number) {
    let obj = this.userOnline[id];
    return obj ? obj.socketId : false;
  }
  processUserOnline(data: UserOnlineParams) {
    let obj = this.userOnline[data.userId];
    this.userOnline[data.userId] = Object.assign({}, obj, data);
  }
}

export default Io;
