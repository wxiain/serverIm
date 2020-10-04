import db from '../../database/db';
import { MiddlewareParams } from '../../types/express.extends';
import { returnPageList, returnErrorMessage } from '../../utils/const';
import { pagination } from '../../utils/method';

declare let process: {
  env: {
    PAGE_SIZE: string;
    PAGE: string;
  };
};

const applyList: MiddlewareParams = function (req, res) {
  let query = req.query;
  let page: number = Number(query.page || process.env.PAGE);
  let page_size: number = Number(query.page_size || process.env.PAGE_SIZE);
  let sql =
    `SELECT * 
    FROM proposers 
    WHERE apply_id=${req.userId} AND 'status'<>'agreement' 
    ORDER BY id LIMIT` + pagination(page, page_size);
  db(sql, true)
    .then((result: any) => {
      returnPageList({ data: result.data, statusCode: 200, page_size, page, res, total: result.total });
    })
    .catch((err) => {
      returnErrorMessage({ res, statusCode: 500, data: err });
    });
};

export default applyList;
