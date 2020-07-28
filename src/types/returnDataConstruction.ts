import { ResponseWithBody } from './express.extends';

export interface ReturnBaseData {
  res: ResponseWithBody;
  statusCode: number;
}

export interface ReturnOperatorData extends ReturnBaseData {
  status: boolean;
  message: string;
}

export interface ReturnObjectData extends ReturnOperatorData {
  data: object;
}

export interface ReturnPageData<T> extends ReturnBaseData {
  data: T[];
  page: number;
  per_page: number;
  total: number;
}
