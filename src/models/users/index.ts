import { MiddlewareParams } from '../../types/express.extends';
import { operatorMessage, returnObject, returnPageList } from '../../utils/const';
const fn: MiddlewareParams = function (req, res) {
  /*returnPageList<{}>({
    res,
    data: [{}],
    page: 1,
    per_page: 10,
    total: 1,
    statusCode: 200
  });*/
  // operatorMessage({ res, message: '2222', status: true,  statusCode: 200 });
  returnObject({ res, message: '333', data: {}, status: true, statusCode: 200 });
};
export default fn;
