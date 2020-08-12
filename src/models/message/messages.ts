import { MiddlewareParams } from '../../types/express.extends';
import db from '../../database/db';
import { returnPageList, returnErrorMessage } from '../../utils/const';

declare let process: {
  env: {
    PAGE_SIZE: string;
  };
};

const messages: MiddlewareParams = function (req, res) {
  let query = req.query;
  let page = Number(query.page || '1') - 1;
  let page_size = Number(query.page_size || process.env.PAGE_SIZE);
  let sql = `SELECT * FROM messages WHERE userId=${req.userId} ORDER BY id LIMIT ${page},${page_size}`;
  db(sql)
    .then((result: any) => {
      returnPageList({ res, statusCode: 200, total: 0, data: result, page_size, page: page + 1 });
    })
    .catch((err) => {
      returnErrorMessage({ res, statusCode: 500, data: err });
    });
};

export default messages;
