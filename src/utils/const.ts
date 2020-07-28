import { ReturnOperatorData, ReturnObjectData, ReturnPageData } from '../types/returnDataConstruction';
export function operatorMessage({ res, message, status }: ReturnOperatorData) {
  res.json({ message, status });
}

export function returnObject({ res, message, data, status }: ReturnObjectData) {
  res.json({ message, data, status });
}

export function returnPageList<T>({ res, data, page, per_page, total }: ReturnPageData<T>) {
  res.json({ data, page, per_page, total });
}
