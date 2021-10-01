import { Router } from 'express';

import { requireLogin, validate } from '../middlewares';
import { SignupValidator, LoginValidator } from '../validators/Auth';
import { AuthController } from '../controllers';
import catcher from '../core/catcher';

const router = Router();

router.post(
  '/signup', 
  [validate(SignupValidator)],
  catcher(AuthController.signup)
);

router.post(
  '/login', 
  [validate(LoginValidator)], 
  catcher(AuthController.login)
);

router.get(
  '/verify', 
  [requireLogin()], 
  catcher(AuthController.verify)
);

export default router;