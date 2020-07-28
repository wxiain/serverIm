import db from '../../database/db';
import { MiddlewareParams } from '../../types/express.extends';
import { UsersLogin } from '../../types/users';
import { returnObject } from '../../utils/const';

const Login: MiddlewareParams = (req, res) => {
  let params: UsersLogin = req.body;
  db(`SELECT * FROM users WHERE username=${params.username} AND password=${params.password}`)
    .then((result: any) => {
      let isLogin = !!result.length;
      let statusCode = isLogin ? 200 : 401;
      let data = isLogin ? result[0] : {};
      Reflect.deleteProperty(data, 'password');
      res.status(statusCode);
      returnObject({
        res,
        data,
        message: isLogin ? '登陆成功' : '用户名或密码错误',
        status: isLogin,
        statusCode
      });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};

export default Login;
