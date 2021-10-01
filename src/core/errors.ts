import {
  StatusCodes,
  ReasonPhrases
} from 'http-status-codes';

import { ValidationError } from 'class-validator';

export default class GenericError extends Error {

  message: any;
  code: number;

  constructor(message: any, code: number) {
    super();
    this.message = message;
    this.code = code;
  }

}

export class BadRequest extends GenericError {
  constructor(message: string = ReasonPhrases.BAD_REQUEST) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

export class NotFound extends GenericError {
  constructor(message: string = ReasonPhrases.NOT_FOUND) {
    super(message, StatusCodes.NOT_FOUND)
  }
}

export class Unauthorized extends GenericError {
  constructor(message: string = ReasonPhrases.UNAUTHORIZED) {
    super(message, StatusCodes.UNAUTHORIZED)
  }
}

export class Validation extends GenericError {
  constructor(message: ValidationError[]) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}