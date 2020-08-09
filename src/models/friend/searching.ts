import { MiddlewareParams } from '../../types/express.extends';
import { returnErrorMessage, returnObject, returnPageList } from '../../utils/const';
import db from '../../database/db';

const searching: MiddlewareParams = function (req, res) {
  let query = req.query;
  let keywords = query.keywords;
  let page = Number(query.page || '0');
  let page_size = Number(query.page_size || '10');
  if (!keywords) {
    returnObject({ res, statusCode: 400, status: false, message: '请输入关键字以检索', data: [] });
    return;
  }
  let sql = `SELECT * FROM users WHERE id<>${req.userId} AND (name LIKE '%${keywords}%' OR nickname LIKE '%${keywords}%' OR mobile LIKE '%${keywords}%')`;
  page += 1;
  db(sql)
    .then((result: any) => {
      returnPageList({ res, statusCode: 200, data: result, page, page_size, total: 1 });
    })
    .catch((err) => {
      returnErrorMessage({ res, data: err, statusCode: 500 });
    });
};

export default searching;
