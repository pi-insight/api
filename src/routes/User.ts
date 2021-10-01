import { Router } from 'express';
import { requireLogin } from '../middlewares';
import { UsersController } from '../controllers';
import catcher from '../core/catcher';

const router = Router();

router.get(
  '/:username',
  [requireLogin()], 
  catcher(UsersController.get)
);


export default router;