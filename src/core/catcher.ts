import { NextFunction, Request, Response } from 'express';

export default function catcher(fn: (req: Request, res: Response) => void) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res);
    }
    catch(e) {
      next(e);
    }
  }
}
