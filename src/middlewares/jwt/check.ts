import jwt, { verify } from 'jsonwebtoken';
import { RequestWithBody, ResponseWithBody, NextFunctionWithBody } from '../../types/express.extends';

// 函数重载, 设置process
declare let process: {
  env: {
    TOKEN_KEY: string;
    TOKEN_EXPIRES_IN: string;
  };
};

export default function (req: RequestWithBody, res: ResponseWithBody, next: NextFunctionWithBody) {
  try {
    let token = req.headers.authorization;
    if (token) {
      let decoded: any = jwt.verify(token, process.env.TOKEN_KEY);
      let date: number = new Date().getTime();
      if (decoded.exp <= date / 1000) {
        res.sendStatus(401);
        res.json({
          message: '用户身份过期',
          detail: 'Unauthenticated.'
        });
      } else {
        req.userId = decoded.userId;
        next();
      }
    } else {
      res.sendStatus(401);
      res.json({
        message: '用户未登录',
        detail: 'Unauthenticated.'
      });
    }
  } catch (err) {
    res.json({
      message: '用户身份过期',
      detail: 'Unauthenticated.'
    });
  }
}
