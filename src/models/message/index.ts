import { MiddlewareParams } from '../../types/express.extends';
const fn: MiddlewareParams = function (req, res) {
  console.log(req.userId);
  res.send('Hello word999999999');
};
export default fn;
