import { MiddlewareParams } from '../../types/express.extends';
import db from '../../database/db';
import { operatorMessage, returnErrorMessage, returnObject } from '../../utils/const';
import { updateValues } from '../../utils/method';

const setUserInfo: MiddlewareParams = function (req, res) {
  let query: object = req.body;
  let userId = req.userId;
  let sql = 'UPDATE users SET' + updateValues(query) + ' WHERE id=' + userId;
  db(sql)
    .then((result: any) => {
      returnObject({ res, data: { ...query, id: userId }, message: '修改成功', status: true, statusCode: 200 });
    })
    .catch((err: { errno: number }) => {
      if (err.errno === 1062) {
        operatorMessage({ res, status: false, message: '该用户名已被使用', statusCode: 400 });
      } else {
        returnErrorMessage({ res, statusCode: 500, data: err });
      }
    });
};

export default setUserInfo;
