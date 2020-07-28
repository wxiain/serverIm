import { ReturnOperatorData, ReturnObjectData, ReturnPageData } from '../types/returnDataConstruction';
export function operatorMessage({ res, message, status, statusCode }: ReturnOperatorData) {
  res.json({ message, status, statusCode });
}

export function returnObject({ res, message, data, status, statusCode }: ReturnObjectData) {
  res.json({ message, data, status, statusCode });
}

export function returnPageList<T>({ res, data, page, per_page, total, statusCode }: ReturnPageData<T>) {
  res.json({ data, page, per_page, total, statusCode });
}
