export default {
  name: 'messages',
  field: {
    id: 'INT(11) AUTO_INCREMENT PRIMARY KEY',
    message: "VARCHAR(255) COMMENT '消息内容'",
    user_id: "INT(11) COMMENT '谁的消息'",
    send_id: "INT(11) COMMENT '谁发的消息'",
    create_at: "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'"
  },
  comment: '某个人的消息(窗口)'
};
