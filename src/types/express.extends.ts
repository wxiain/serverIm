import { Response, Request, NextFunction } from 'express';

export interface RequestWithBody extends Request {
  userId?: number;
}

export interface ResponseWithBody extends Response {}

export interface NextFunctionWithBody extends NextFunction {}

export type MiddlewareParams = (req: RequestWithBody, res: ResponseWithBody, next?: NextFunctionWithBody) => void;
