import Joi from 'joi';

export interface ILoginValidator {
  email: string;
  password: string;
}

export const LoginValidator = Joi.object<ILoginValidator>({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(255).required(),
}).required()

export interface ISignUpValidator {
  username: string;
  email: string;
  password: string;
}

export const SignupValidator = Joi.object<ISignUpValidator>({
  username: Joi.string().min(5).max(22).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().min(8).max(255).required()
})
