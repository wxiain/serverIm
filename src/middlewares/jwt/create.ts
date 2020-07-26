import jwt from 'jsonwebtoken';
interface Token {
  id: number;
}

// 函数重载, 设置process
declare let process: {
  env: {
    TOKEN_KEY: string;
    TOKEN_EXPIRES_IN: string;
  };
};

export default function ({ id }: Token) {
  let { TOKEN_KEY, TOKEN_EXPIRES_IN } = process.env;
  return jwt.sign({ userId: id }, TOKEN_KEY, { expiresIn: Number(TOKEN_EXPIRES_IN) });
}
