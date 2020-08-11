import db from '../../database/db';
import { MiddlewareParams } from '../../types/express.extends';
import { returnPageList, returnErrorMessage } from '../../utils/const';

const applyList: MiddlewareParams = function (req, res) {
  let query = req.query;
  let page: number = Number(query.page || '0');
  let page_size: number = Number(query.page_size || '20');
  let sql = `SELECT * FROM proposers WHERE apply_id = ${req.userId} ORDER BY id LIMIT ${page},${page_size}`;
  db(sql).then((result: any) => {
    returnPageList({ data: result, statusCode: 200, page_size, page: page + 1, res, total: 0 });
  });
};

export default applyList;
