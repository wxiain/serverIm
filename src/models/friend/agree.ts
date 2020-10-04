import { MiddlewareParams } from '../../types/express.extends';
import db from '../../database/db';
import { returnErrorMessage, operatorMessage } from '../../utils/const';
import { Agree } from '../../types/friend';
import { createValues } from '../../utils/method';

const agree: MiddlewareParams = function (req, res) {
  let { body, params }: Agree = req;
  let data: { user: object | string; apply: object | string; relation_id: string; apply_id: string } = {
    user: body.user,
    apply: body.apply,
    apply_id: body.apply_id,
    relation_id: body.relation_id
  };
  let validate = [
    { value: params.id, key: '申请的id' },
    { value: data.user, key: '被申请人的资料' },
    { value: data.apply, key: '申请人的资料' }
  ];
  for (let item of validate) {
    if (!item.value) {
      operatorMessage({ res, statusCode: 400, status: false, message: item.key + '是必须的' });
      return;
    }
  }
  let sql = `SELECT * FROM proposers WHERE id=${params.id}`;
  db(sql)
    .then((result: any) => {
      if (!result.length) {
        operatorMessage({ res, statusCode: 400, status: false, message: '没有该条数据, 请检查参数' });
        return;
      }
      return db(`UPDATE proposers SET status='${body.status}' WHERE id=${params.id}`);
    })
    .then(() => {
      if (body.status === 'agreement') {
        data.user = JSON.stringify(data.user);
        data.apply = JSON.stringify(data.apply);
        return db(`INSERT INTO friends ${createValues(data)}`);
      } else {
        operatorMessage({ res, message: '您拒绝了' + body.apply.username + '的请求', status: true, statusCode: 200 });
      }
    })
    .then(() => {
      operatorMessage({ res, message: '添加成功', status: true, statusCode: 200 });
    })
    .catch((err) => {
      returnErrorMessage({ res, statusCode: 500, data: err });
    });
};

export default agree;
