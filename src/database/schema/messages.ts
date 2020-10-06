export default {
  name: 'messages',
  field: {
    id: 'INT(11) AUTO_INCREMENT PRIMARY KEY',
    message: "VARCHAR(255) COMMENT '消息内容'",
    receive_id: "INT(11) COMMENT '接收方'",
    send_id: "INT(11) COMMENT '发送方'",
    create_at: "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'"
  },
  comment: '某个人的消息(窗口)'
};
