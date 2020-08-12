import { MiddlewareParams } from '../../types/express.extends';
import db from '../../database/db';
import { returnErrorMessage, operatorMessage } from '../../utils/const';
import { Agree } from '../../types/friend';

const agree: MiddlewareParams = function (req, res) {
  let { id }: Agree = req.body;
  if (!id) {
    operatorMessage({ res, statusCode: 400, status: false, message: '申请的id是必须的' });
    return;
  }
  let sql = `SELECT * FROM proposers WHERE id=${id}`;
  db(sql)
    .then((result: any) => {
      if (!result.length) {
        operatorMessage({ res, statusCode: 400, status: false, message: '没有该条数据, 请检查参数' });
        return;
      }
      let { name, age, gender = null, nickname, avatar = null, mobile = null, apply_id } = result[0];
      return db(
        `INSERT INTO friends (user_id,relation_id,name,age,gender,nickname,avatar,mobile) VALUES  (${req.userId},${apply_id},'${name}',${age},'${gender}','${nickname}','${avatar}','${mobile}')`
      );
    })
    .then(() => {
      return db(`DELETE FROM proposers WHERE id=${id}`);
    })
    .then(() => {
      operatorMessage({ res, message: '添加成功', status: true, statusCode: 200 });
    })
    .catch((err) => {
      returnErrorMessage({ res, statusCode: 500, data: err });
    });
};

export default agree;
