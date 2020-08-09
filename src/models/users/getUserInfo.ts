import db from '../../database/db';
import { MiddlewareParams } from '../../types/express.extends';
import { returnErrorMessage, returnObject } from '../../utils/const';
import create from '../../middlewares/jwt/create';

const getUserInfo: MiddlewareParams = function (req, res) {
  db(`SELECT * FROM users WHERE id=${req.userId}`)
    .then((result: any) => {
      res.status(200);
      let userId = Number(req.userId);
      let token = create({ id: userId });
      let data = result[0];
      Reflect.deleteProperty(data, 'password');
      returnObject({
        res,
        data,
        message: '获取成功',
        status: true,
        token,
        statusCode: 200
      });
    })
    .catch((err) => {
      returnErrorMessage({ res, data: err, statusCode: 500 });
    });
};

export default getUserInfo;
