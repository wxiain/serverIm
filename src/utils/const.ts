import {
  ReturnOperatorData,
  ReturnObjectData,
  ReturnPageData,
  ReturnErrorMessage
} from '../types/returnDataConstruction';
export function operatorMessage({ res, message, status, statusCode }: ReturnOperatorData) {
  res.status(statusCode);
  res.json({ message, status, statusCode });
}

export function returnObject({ res, message, data, status, statusCode, token }: ReturnObjectData) {
  res.status(statusCode);
  res.json({ message, data, status, statusCode, token });
}

export function returnPageList<T>({ res, data, page, page_size, total, statusCode }: ReturnPageData<T>) {
  res.status(statusCode);
  res.json({ data, page, page_size, total, statusCode });
}

export function returnErrorMessage({ res, data, statusCode }: ReturnErrorMessage) {
  res.status(statusCode);
  res.json(data);
}
