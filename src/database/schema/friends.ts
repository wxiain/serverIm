export default {
  name: 'friends',
  field: {
    id: 'INT(11) AUTO_INCREMENT PRIMARY KEY',
    user_id: "INT(11) COMMENT '用户id(user.id, 属于谁的)'",
    relation_id: "INT(11) COMMENT '与user_id建立关系的id'",
    nickname: "VARCHAR(10) COMMENT 'relation的nickname'",
    username: "VARCHAR(10) COMMENT 'relation的username'",
    gender: "ENUM('男', '女', '保密') COMMENT 'relation性别'",
    age: "INT(3) COMMENT 'relation年龄'",
    address: "VARCHAR(255) COMMENT 'relation地址'",
    mobile: "VARCHAR(11) COMMENT 'relation手机号码'",
    email: "VARCHAR(255) COMMENT 'relation邮件地址'",
    avatar: "VARCHAR(255) COMMENT 'relation头像地址'",
    create_at: "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'",
    update_at: "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'"
  },
  comment: '朋友列表'
};
