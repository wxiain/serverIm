import db from '../../database/db';
import { returnErrorMessage, operatorMessage, returnObject } from '../../utils/const';
import { MiddlewareParams } from '../../types/express.extends';
import { Read } from '../../types/message';

const read: MiddlewareParams = function (req, res) {
  let params: Read = req.params;
  let id = params.id;
  if (!id) {
    returnObject({ res, statusCode: 400, status: false, message: '请传入消息列表id', data: [] });
    return;
  }
  db(`UPDATE links SET unread_count=${0} WHERE id=${id}`)
    .then((result: any) => {
      operatorMessage({ res, message: '消息已读成功', status: true, statusCode: 200 });
    })
    .catch((err) => {
      returnErrorMessage({ res, statusCode: 500, data: err });
    });
};

export default read;
