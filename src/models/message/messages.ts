import { MiddlewareParams } from '../../types/express.extends';
import db from '../../database/db';
import { returnPageList, returnErrorMessage } from '../../utils/const';

declare let process: {
  env: {
    PAGE_SIZE: string;
    PAGE: string;
  };
};

const messages: MiddlewareParams = function (req, res) {
  let query = req.query;
  let page = Number(query.page || process.env.PAGE);
  let page_size = Number(query.page_size || process.env.PAGE_SIZE);
  let sql = `SELECT * FROM messages 
        WHERE (receive_id=${req.userId} AND send_id=${query.id}) OR (receive_id=${query.id} AND send_id=${req.userId}) 
        ORDER BY id LIMIT ${page},${page_size}`;
  db(sql, true)
    .then((result: any) => {
      returnPageList({ res, statusCode: 200, total: result.total, data: result.data, page_size, page: page + 1 });
    })
    .catch((err) => {
      returnErrorMessage({ res, statusCode: 500, data: err });
    });
};

export default messages;
