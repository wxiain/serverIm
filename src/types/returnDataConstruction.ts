import { ResponseWithBody } from './express.extends';

export interface ReturnBaseData {
  res: ResponseWithBody;
  statusCode: number;
  token?: string;
}

export interface ReturnOperatorData extends ReturnBaseData {
  status: boolean;
  message: string;
}

export interface ReturnObjectData extends ReturnOperatorData {
  data: object;
}

export interface ReturnErrorMessage extends ReturnBaseData {
  data: object;
}

export interface ReturnPageData<T> extends ReturnBaseData {
  data: T[];
  page: number;
  page_size: number;
  total: number;
}
