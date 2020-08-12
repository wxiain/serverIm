import { MiddlewareParams } from '../../types/express.extends';
import db from '../../database/db';
import { returnPageList, returnErrorMessage } from '../../utils/const';

declare let process: {
  env: {
    PAGE_SIZE: string;
  };
};

const myList: MiddlewareParams = function (req, res) {
  let query = req.query;
  let page = Number(query.page || '1') - 1;
  let page_size = Number(query.page_size || process.env.PAGE_SIZE);
  let sql = `SELECT * FROM friends WHERE user_id = ${req.userId} ORDER BY id LIMIT ${page},${page_size}`;
  page = page + 1;
  db(sql)
    .then((result: any) => {
      returnPageList({ res, page, page_size, data: result, total: 0, statusCode: 200 });
    })
    .catch((err) => {
      returnErrorMessage({ res, statusCode: 500, data: err });
    });
};

export default myList;
