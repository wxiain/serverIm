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
 * @params {String} nickname  发送方昵称
 * @params {String} username  发送方用户名
 * @params {String} avatar  发送方头像
 * @params {String} gender  发送方性别
 */
export interface Message {
  message: string;
  send_id: number;
  receive_id: number;
  message_id?: number;
  nickname: string;
  username: string;
  avatar: string;
  gender: string;
}
