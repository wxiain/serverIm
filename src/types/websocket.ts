import WebSocket, { Server } from 'ws';

export interface UserOnline {
  [key: number]: WebSocket;
}

/**
 * 接收消息体结构
 * @params {String} message 消息内容
 * @params {Number} send_id 发送id
 * @params {Number} receive_id 接收id
 * @params {Number} message_id  消息id
 * @params {Object} user 发送方
 * @params {Object} receive 接收方
 */
export interface Message {
  message: string;
  send_id: number;
  receive_id: number;
  message_id?: number;
  user?: object;
  receive?: object;
}
