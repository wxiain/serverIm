import db from '../../database/db';
import {MiddlewareParams} from '../../types/express.extends';
import {returnErrorMessage, operatorMessage, returnObject} from '../../utils/const';
import create from '../../middlewares/jwt/create';
import {UsersRegister} from '../../types/users';

const register: MiddlewareParams = function(req, res) {
  let params:UsersRegister = req.body;
  let validate = [
    { value: params.password, key: 'password' },
    { value: params.username, key: 'username' },
    { value: params.confirmPassword, key: 'confirmPassword' },
  ];
  for (let item of validate) {
    if (!item.value) {
      operatorMessage({ res, statusCode: 400, status: false, message: item.key + '是必须的' });
      return;
    }
  }
  if (params.confirmPassword !== params.password) {
    return operatorMessage({res, statusCode: 400, message:'密码和确认密码不一致', status: false})
  }
  db(`SELECT id FROM users WHERE username=${params.username}`).then((result:any) => {
    if (result.length) {
      return operatorMessage({res, status: false, message: '该用户名已被使用', statusCode: 400});
    }
    return db(`INSERT INTO users (username,password) VALUES (${params.username},${params.password});`)
  }).then((result: any) => {
    // select @@IDENTITY as id;
    let id:number = result.insertId;
    let object = {
      res,
      message: '注册成功',
      status: true,
      statusCode: 200,
      data: {
        username: params.username,
        id
      },
    }
    returnObject(Object.assign({}, object, params.type === 'login'? {token: create({id})}: {}));
  })
}

export default register;