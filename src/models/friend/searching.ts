import { MiddlewareParams } from '../../types/express.extends';
import { returnObject, returnPageList } from '../../utils/const';
import db from '../../database/db';

const searching: MiddlewareParams = function (req, res) {
  let keywords = req.query;
  if (!keywords) {
    returnObject({ res, statusCode: 400, status: false, message: '请输入关键字以检索', data: [] });
    return;
  }
  let sql = `SELECT * FROM users WHERE id<>${req.userId} AND (name LIKE '%${keywords}%' OR nickname LIKE '%${keywords}%' OR mobile LIKE '%${keywords}%')`;
  db(sql).then((result: any) => {
    res.status(200);
    returnPageList({ res, statusCode: 200, data: result, page: 1, per_page: 10, total: 1 });
  });
};

export default searching;
