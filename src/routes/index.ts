import { Application } from "express";
import { ok } from "../core/response";

import AuthRouter from './Auth';
import UserRouter from './User';

export default function registerRouters(app: Application) {
  
  // Check status
  app.get('/', (_, res) => res.json(ok()));
  
  app.use('/auth', AuthRouter);
  app.use('/user', UserRouter);

}
