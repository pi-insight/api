import { BadRequest, Unauthorized } from './../core/errors';
import { Request, Response } from "express";
import User from "../database/models/User";
import { ok } from '../core/response';

export default class UsersController {

  static async get(req: Request, res: Response) {

    const { username } = req.params;

    if(!username)
      throw new BadRequest('invalid username');
    
    const user = await User.findOne({ username });

    if(!user)
      throw new BadRequest('invalid username');

    return res.json(ok(user))
  }
  

}
