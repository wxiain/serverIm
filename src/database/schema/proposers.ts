export default {
  name: 'proposers',
  field: {
    id: 'INT(11) AUTO_INCREMENT',
    user_id: "INT(11) NOT NULL COMMENT '主键1, 请求添加对方id'",
    apply_id: "INT(11) NOT NULL COMMENT '主键2, 申请添加id'",
    message: "VARCHAR(255) COMMENT '附加信息'",
    avatar: "VARCHAR(255) COMMENT '被申请人的头像'",
    username: "VARCHAR(10) COMMENT '被申请人的username'",
    status: "ENUM('underReview','reject','agreement') COMMENT '状态,underReview审核中,reject拒绝,agreement同意'",
    create_at: "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'",
    update_at: "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'",
    KEY: '(id)',
    'PRIMARY KEY': '(user_id, apply_id)'
  },
  comment: '申请列表'
};
