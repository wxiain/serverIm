import * as http from 'http';

export interface IncomingMessage extends http.IncomingMessage {
  headers: {
    'sec-websocket-protocol': string;
  };
}
