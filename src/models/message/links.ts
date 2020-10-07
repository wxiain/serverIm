import { MiddlewareParams } from '../../types/express.extends';
import db from '../../database/db';
import { returnPageList, returnErrorMessage, operatorMessage } from '../../utils/const';
import { pagination, sortReturnString } from '../../utils/method';

declare let process: {
  env: {
    PAGE_SIZE: string;
    PAGE: string;
  };
};

const links: MiddlewareParams = function (req, res) {
  let query = req.query;
  let page = Number(query.page || process.env.PAGE);
  let page_size = Number(query.page_size || process.env.PAGE_SIZE);
  if (!query.id) {
    operatorMessage({ res, statusCode: 400, status: false, message: '对方的id是必须的' });
    return;
  }
  let sql = `SELECT * FROM links 
    WHERE ids=${sortReturnString(Number(req.userId), Number(query.id))} 
    ORDER BY id LIMIT${pagination(page, page_size)}`;
  db(sql, true)
    .then((result: any) => {
      for (let item of result.data) {
        item.user = JSON.parse(item.user);
        item.receive = JSON.parse(item.receive);
      }
      returnPageList({ res, statusCode: 200, page, page_size, data: result.data, total: result.total });
    })
    .catch((err) => {
      returnErrorMessage({ res, statusCode: 500, data: err });
    });
};

export default links;
