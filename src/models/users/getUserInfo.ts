import db from '../../database/db';
import { MiddlewareParams } from '../../types/express.extends';
import { returnErrorMessage, returnObject } from '../../utils/const';
import create from '../../middlewares/jwt/create';

const getUserInfo: MiddlewareParams = function (req, res) {
  let query = req.query;
  let userId2 = Number(query.userId);
  db(`SELECT * FROM users WHERE id=${userId2 || req.userId}`)
    .then((result: any) => {
      res.status(200);
      let userId = Number(req.userId);
      let data = result[0];
      let obj = {
        res,
        data,
        message: '获取成功',
        status: true,
        statusCode: 200
      };
      if (!userId2) {
        Reflect.set(obj, 'token', create({ id: userId }));
      } else {
        Reflect.deleteProperty(obj.data, 'create_at');
        Reflect.deleteProperty(obj.data, 'updated_at');
      }
      Reflect.deleteProperty(obj.data, 'password');
      returnObject(obj);
    })
    .catch((err) => {
      returnErrorMessage({ res, data: err, statusCode: 500 });
    });
};

export default getUserInfo;
