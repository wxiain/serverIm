import jwt from 'jsonwebtoken';
// 函数重载, 设置process
declare let process: {
  env: {
    TOKEN_KEY: string;
    TOKEN_EXPIRES_IN: string;
  };
};
interface AnalysisToken {
  statusCode: number;
  message?: string;
  detail?: string;
  userId?: number;
}

export default function (token: string): AnalysisToken {
  try {
    let decoded: any = jwt.verify(token, process.env.TOKEN_KEY);
    let date: number = new Date().getTime();
    if (decoded.exp >= date / 1000) {
      return {
        statusCode: 200,
        userId: decoded.userId
      };
    } else {
      return {
        statusCode: 401,
        message: '用户身份过期',
        detail: 'Unauthenticated.'
      };
    }
  } catch (e) {
    return {
      statusCode: 401,
      message: '用户身份过期',
      detail: 'Unauthenticated.'
    };
  }
}
