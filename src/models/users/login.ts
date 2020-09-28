import db from '../../database/db';
import { MiddlewareParams } from '../../types/express.extends';
import { UsersLogin } from '../../types/users';
import { returnObject, returnErrorMessage, operatorMessage } from '../../utils/const';
import create from '../../middlewares/jwt/create';

const Login: MiddlewareParams = (req, res) => {
  let params: UsersLogin = req.body;
  let validate = [
    { value: params.password, key: 'password' },
    { value: params.username, key: 'username' }
  ];
  for (let item of validate) {
    if (!item.value) {
      operatorMessage({ res, statusCode: 400, status: false, message: item.key + '是必须的' });
      return;
    }
  }
  db(`SELECT * FROM users WHERE username='${params.username}' AND password=${params.password}`)
    .then((result: any) => {
      let isLogin = !!result.length;
      let statusCode = isLogin ? 200 : 401;
      let data = isLogin ? result[0] : {};
      let token = isLogin ? create({ id: data.id }) : '';
      Reflect.deleteProperty(data, 'password');
      returnObject({
        res,
        data,
        message: isLogin ? '登陆成功' : '用户名或密码错误',
        status: isLogin,
        token,
        statusCode
      });
    })
    .catch((err) => {
      returnErrorMessage({ res, data: err, statusCode: 500 });
    });
};

export default Login;
