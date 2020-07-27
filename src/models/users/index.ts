import { MiddlewareParams } from '../../types/express.extends';
import { operatorMessage, returnObject, returnPageList } from '../../utils/const';
const fn: MiddlewareParams = function (req, res) {
  returnPageList<{}>({
    res,
    data: [{}],
    page: 1,
    per_page: 10
  });
};
export default fn;
