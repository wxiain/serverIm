import { MiddlewareParams } from '../../types/express.extends';
import db from '../../database/db';
import { returnPageList, returnErrorMessage } from '../../utils/const';
import { pagination } from '../../utils/method';

declare let process: {
  env: {
    PAGE_SIZE: string;
    PAGE: string;
  };
};

const myList: MiddlewareParams = function (req, res) {
  let query = req.query;
  let page = Number(query.page || process.env.PAGE);
  let page_size = Number(query.page_size || process.env.PAGE_SIZE);
  let sql = `SELECT * FROM friends 
        WHERE apply_id = ${req.userId} OR relation_id=${req.userId} 
        ORDER BY id LIMIT ${pagination(page, page_size)}`;
  db(sql, true)
    .then((result: any) => {
      let data = result.data;
      for (let item of data) {
        item.user = JSON.parse(item.user);
        item.apply = JSON.parse(item.apply);
      }
      returnPageList({ res, page, page_size, data, total: result.total, statusCode: 200 });
    })
    .catch((err) => {
      returnErrorMessage({ res, statusCode: 500, data: err });
    });
};

export default myList;
