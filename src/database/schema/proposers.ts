export default {
  name: 'proposers',
  field: {
    id: 'INT(11) AUTO_INCREMENT PRIMARY KEY',
    user_id: "INT(11) COMMENT '请求添加对方id'",
    apply_id: "INT(11) COMMENT '申请添加id'",
    message: "VARCHAR(255) COMMENT '附加信息'",
    send_id: "INT(11) COMMENT '谁发的消息'",
    username: "VARCHAR(10) COMMENT '申请人的username'",
    status: "ENUM('underReview','reject','agreement') COMMENT '状态,underReview审核中,reject拒绝,agreement同意'",
    create_at: "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'",
    update_at: "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'"
  },
  comment: '申请列表'
};
