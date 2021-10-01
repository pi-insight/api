import { Request, Response } from "express";

import { BadRequest, Unauthorized } from '../core/errors';
import { ok } from "../core/response";
import User from "../database/models/User";
import { ILoginValidator, ISignUpValidator } from '../validators/Auth';

export default class AuthController {

  static async signup(req: Request, res: Response) {
  
    const { username, email, password } = req.parsed<ISignUpValidator>();

    const inUse = !!(await User.findByUsernameOrEmail(username, email))

    if(inUse)
      throw new BadRequest('email or username already in use');

    const user = await User.add({
      username,
      email,
      password
    });

    const token = await user.generateToken();

    return res.json(ok({
      user,
      token
    }));
  }

  static async login(req: Request, res: Response) {

    const { email, password } = req.parsed<ILoginValidator>();

    const user = await User.findOne({ email });

    if(!user)
      throw new Unauthorized('invalid credentials');

    const valid = await user.password.compare(password)

    if(!valid)
      throw new Unauthorized('invalid credentials');

    const token = await user.generateToken();

    return res.json(ok({
      user,
      token,
    }))
  }

  static async verify(req: Request, res: Response) {
    return res.json(ok());
  }

}
