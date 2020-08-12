import { MiddlewareParams } from '../../types/express.extends';
import db from '../../database/db';
import { returnPageList, returnErrorMessage } from '../../utils/const';

const links: MiddlewareParams = function (req, res) {
  let query = req.query;
  let page = Number(query.page || '1') - 1;
  let page_size = Number(query.page_size || '20');
  let sql = `SELECT * FROM links WHERE userId=${req.userId} OR sendId=${req.userId} ORDER BY id LIMIT ${page},${page_size}`;
  db(sql)
    .then((result: any) => {
      returnPageList({ res, statusCode: 200, page: page + 1, page_size, data: result, total: 0 });
    })
    .catch((err) => {
      returnErrorMessage({ res, statusCode: 500, data: err });
    });
};

export default links;
