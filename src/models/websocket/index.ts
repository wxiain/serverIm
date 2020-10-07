import WebSocket, { Server } from 'ws';
import { UserOnline, Message } from '../../types/websocket';
import { Server as HttpServer } from 'http';
import { createValues } from '../../utils/method';
import analysisToken from '../../middlewares/jwt/analysisToken';
import { IncomingMessage } from '../../types/http.extends';
import { sortReturnString } from '../../utils/method';
import db from '../../database/db';

function transferToString(data: any): string {
  return JSON.stringify(data);
}

function transferToObject<T>(data: string): T {
  return JSON.parse(data);
}

class Ws {
  key = process.env.TOKEN_KEY;
  userOnline: UserOnline = {};
  wss: Server;
  constructor(server: HttpServer) {
    this.wss = new WebSocket.Server({ server });
    this.init();
  }
  init() {
    this.wss.on('connection', (ws, req: IncomingMessage) => {
      let authentication = analysisToken(req.headers['sec-websocket-protocol']);
      if (authentication.statusCode === 401) {
        ws.send(transferToString({ message: 'token无效或未登录', status: false }));
        ws.close();
        return;
      }
      let userId = Number(authentication.userId);
      this.userOnline[userId] = ws;
      this.close(userId);
      this.message(userId);
    });
  }
  message(userId: number) {
    this.userOnline[userId].on('message', (data: string) => {
      // 接收到消息, 先保存到数据库后发给客户端
      this.saveMessage(transferToObject<Message>(data));
    });
  }
  returnMessage(userId: number, data: Message) {
    this.userOnline[userId].send(transferToString(data));
  }
  send(receiveId: number, data: Message) {
    // 给某人发送消息
    this.userOnline[receiveId] && this.userOnline[receiveId].send(transferToString(data));
  }
  saveMessage(data: Message) {
    let obj = {
      message: data.message,
      send_id: data.send_id,
      receive_id: data.receive_id
    };
    db(`INSERT INTO messages ${createValues(obj)}`).then((result: any) => {
      data.message_id = result.insertId;
      this.returnMessage(data.send_id, data);
      this.send(data.receive_id, data);
    });
    let obj2 = {
      message: data.message,
      ids: sortReturnString(data.send_id, data.receive_id),
      user: JSON.stringify(data.user),
      receive: JSON.stringify(data.receive)
    };
    db(
      `INSERT INTO links ${createValues(obj2)} 
        ON DUPLICATE KEY UPDATE message='${data.message}',unread_count=IF(unread_count IS NULL, 1, unread_count+1)`
    ).catch((err) => {
      console.log(err);
    });
  }
  close(userId: number) {
    this.userOnline[userId].on('close', () => {
      Reflect.deleteProperty(this.userOnline, userId);
    });
  }
}

export default Ws;
