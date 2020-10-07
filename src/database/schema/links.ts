export default {
  name: 'links',
  field: {
    id: "INT(11) AUTO_INCREMENT COMMENT '记录id,不能为主键,需要自增,否则在非增为改的时会失败而产生新的记录'",
    ids: "VARCHAR(11) NOT NULL COMMENT '双方的id, 升序, 中间逗号隔开'",
    user: "json COMMENT '发送方'",
    receive: "json COMMENT '接收方'",
    message: "VARCHAR(255) COMMENT '消息'",
    unread_count: "INT(11) DEFAULT 1 COMMENT '消息未读合计'",
    create_at: "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'",
    update_at: "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'",
    KEY: '(id)',
    'PRIMARY KEY': '(ids)'
  },
  comment: '消息列表'
};
