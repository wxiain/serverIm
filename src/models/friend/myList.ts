import { MiddlewareParams } from '../../types/express.extends';
import db from '../../database/db';
import { returnPageList } from '../../utils/const';

const myList: MiddlewareParams = function (req, res) {
  let query = req.query;
  let page = Number(query.page || '0');
  let page_size = Number(query.page_size || '10');
  let sql = `SELECT * FROM friends WHERE user_id = ${req.userId} ORDER BY id LIMIT ${page},${page_size}`;
  page = page + 1;
  db(sql).then((result: any) => {
    res.status(500);
    returnPageList({ res, page, page_size, data: result, total: 0, statusCode: 200 });
  });
};

export default myList;
