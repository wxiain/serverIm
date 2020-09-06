export default {
  name: 'users',
  field: {
    id: 'INT(11) AUTO_INCREMENT PRIMARY KEY',
    nickname: "VARCHAR(10) COMMENT '昵称'",
    username: "VARCHAR(10) unique COMMENT '用户名'",
    password: "VARCHAR(16) COMMENT '密码'",
    gender: "ENUM('男', '女', '保密') COMMENT '性别'",
    age: "INT(3) COMMENT '年龄'",
    address: "VARCHAR(255) COMMENT '地址'",
    mobile: "VARCHAR(11) COMMENT '手机号码'",
    email: "VARCHAR(255) COMMENT '邮件地址'",
    avatar: "VARCHAR(255) COMMENT '头像地址'",
    create_at: "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'",
    update_at: "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'"
  },
  comment: '用户表'
};
