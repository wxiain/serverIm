import { MiddlewareParams } from '../../types/express.extends';
import { returnErrorMessage, returnObject, returnPageList } from '../../utils/const';
import db from '../../database/db';

const searching: MiddlewareParams = function(req, res) {
  let query = req.query;
  let keywords = query.keywords;
  let page = Number(query.page || '0');
  let page_size = Number(query.page_size || '10');
  if (!keywords) {
    returnObject({ res, statusCode: 400, status: false, message: '请输入关键字以检索', data: [] });
    return;
  }
  let sql = `SELECT users.id,users.username,users.nickname,users.mobile,users.gender,users.age,users.avatar,users.address
    FROM users LEFT JOIN friends
    ON users.id <> friends.relation_id
    WHERE users.id<>${req.userId}
    AND (instr(users.username, '${keywords}') > 0 OR instr(users.mobile, '${keywords}') > 0)
    ORDER BY users.id LIMIT ${Math.max(0, page - 1) * page_size},${page_size}`;
  db(sql, true)
    .then((result: any) => {
      returnPageList({ res, statusCode: 200, total: result.total, data: result.data, page, page_size });
    })
    .catch((err) => {
      returnErrorMessage({ res, data: err, statusCode: 500 });
    });
};

export default searching;
