import { Unauthorized } from './../core/errors';
import { NextFunction, Request, Response } from 'express';
import User from '../database/models/User';
import { FindOneOptions } from 'typeorm';

declare global {
  namespace Express {
    interface Request {
      user: User
    }
  }
}

export default function requireLogin(options?: FindOneOptions) {

  return async (req: Request, res: Response, next: NextFunction) => {

    try {
      const token = req.headers.authorization?.split('Bearer ')[1];

      if(!token)
        throw new Unauthorized('invalid token');
      
      const user = await User.findByToken(token, options);

      if(!user)
        throw new Unauthorized('invalid token');
    
      req.user = user;
    
      return next();
    }
    catch(e) {
      return next(e)
    }

  }

}