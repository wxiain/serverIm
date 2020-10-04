export default {
  name: 'friends',
  field: {
    id: 'INT(11) AUTO_INCREMENT PRIMARY KEY',
    apply_id: "INT(11) COMMENT '申请人的id'",
    relation_id: "INT(11) COMMENT '与apply_id建立关系的id'",
    apply: "json COMMENT '申请人的资料'",
    user: "json COMMENT '被申请人的资料'",
    create_at: "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'",
    update_at: "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'"
  },
  comment: '朋友列表'
};
