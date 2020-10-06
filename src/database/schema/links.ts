export default {
  name: 'links',
  field: {
    id: "INT(11) AUTO_INCREMENT COMMENT '记录id,不能为主键,需要自增,否则在非增为改的时会失败而产生新的记录'",
    send_id: "INT(11) NOT NULL COMMENT '主键1, 发送方的id'",
    username: "VARCHAR(10) COMMENT '发送方的username, 有nickname时显示这个'",
    message: "VARCHAR(255) COMMENT '消息'",
    nickname: "VARCHAR(10) COMMENT '发送方的nickname'",
    avatar: "VARCHAR(255) COMMENT '发送方的头像'",
    gender: "ENUM('男', '女', '保密') COMMENT '发送方的性别'",
    receive_id: "INT(11) NOT NULL COMMENT '主键2, 接收方id'",
    unread_count: "INT(11) DEFAULT 0 COMMENT '消息未读合计'",
    create_at: "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'",
    update_at: "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'",
    KEY: '(id)',
    'PRIMARY KEY': '(send_id,receive_id)'
  },
  comment: '消息列表'
};
