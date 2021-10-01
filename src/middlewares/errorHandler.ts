import { NextFunction, Request, Response } from 'express';

export default function errorHandler() {
  return function handler(err: any, req: Request, res: Response, next: NextFunction) {

    if (typeof err.code === 'number') {
      return res.status(err.code).json({
        status: 'error',
        message: err.message,
      });
    }
  
    return res.status(500).json({
      status: 'error',
      message: err.message,
    });

  }
}