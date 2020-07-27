import { ResponseWithBody } from './express.extends';

export interface ReturnBaseData {
  res: ResponseWithBody;
}

export interface ReturnOperatorData {
  res: ResponseWithBody;
  status: boolean;
  message: string;
}

export interface ReturnObjectData extends ReturnOperatorData {
  status: boolean;
  message: string;
  data: object;
}

export interface ReturnPageData<T> extends ReturnBaseData {
  data: T[];
  page: number;
  per_page: number;
}
