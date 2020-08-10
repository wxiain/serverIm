import { MiddlewareParams } from '../../types/express.extends';
import db from '../../database/db';
import { Apply } from '../../types/users';
import { returnErrorMessage, operatorMessage } from '../../utils/const';

const apply: MiddlewareParams = function (req, res) {
  let body: Apply = req.body;
  let { name, nickname = null, avatar = null, age = null, gender, mobile = null, message = null, apply_id } = body;
  apply_id = Number(apply_id);
  let validate = [
    { value: name, key: 'name' },
    { value: apply_id, key: 'apply_id' }
  ];
  for (let item of validate) {
    if (!item.value) {
      operatorMessage({ res, statusCode: 400, message: item.key + '是必须的', status: false });
      return;
    }
  }
  let sql = `INSERT INTO proposers (name,nickname,avatar,user_id,age,gender,mobile,message,apply_id) VALUES ('${name}','${nickname}','${avatar}','${req.userId}','${age}','${gender}','${mobile}','${message}','${apply_id}')`;
  db(sql)
    .then((result) => {
      operatorMessage({ res, status: true, statusCode: 200, message: '申请信息已发送, 请等待对方同意' });
    })
    .catch((err) => {
      returnErrorMessage({ res, statusCode: 500, data: err });
    });
};

export default apply;