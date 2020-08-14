import jwt from 'jsonwebtoken';
import analysisToken from './analysisToken';
import { RequestWithBody, ResponseWithBody, NextFunctionWithBody } from '../../types/express.extends';

export default function (req: RequestWithBody, res: ResponseWithBody, next: NextFunctionWithBody) {
  let token = req.headers.authorization;
  if (token) {
    let { message, detail, statusCode, userId } = analysisToken(token);
    userId = userId || 0;
    if (statusCode === 200) {
      req.userId = userId;
      next();
      return;
    }
    res.status(401);
    res.json({
      message,
      detail
    });
  } else {
    res.status(401);
    res.json({
      message: '用户未登录',
      detail: 'Unauthenticated'
    });
  }
}
