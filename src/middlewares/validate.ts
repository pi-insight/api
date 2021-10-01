import { NextFunction } from "connect";
import { Request, Response } from "express-serve-static-core"
import { ObjectSchema } from "joi"


declare global {
  namespace Express {
    interface Request {
      parsed<U>(): U;
    }
  }
}

export default function validate(schema: ObjectSchema) {

  return async (req: Request, res: Response, next: NextFunction) => {

    let errors: any;

    const parsed = await schema.validateAsync(req.body).catch(e => errors = e);

    req.parsed = function <U>(): U {
      return <U> parsed;
    }

    next(errors);

  }

}