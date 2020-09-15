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
  let sql = `SELECT id,username,nickname,mobile,gender,age,avatar,address
    FROM users 
    WHERE id<>${req.userId} 
    AND instr(username, '${keywords}') > 0 
    OR instr(mobile, '${keywords}') > 0 
    ORDER BY id LIMIT ${page},${page_size}`;
  db(sql, true)
    .then((result: any) => {
      returnPageList({ res, statusCode: 200, total: result.total, data: result.data, page: page + 1, page_size });
    })
    .catch((err) => {
      returnErrorMessage({ res, data: err, statusCode: 500 });
    });
};

export default searching;
