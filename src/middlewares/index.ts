import { Application } from 'express'

// Middlewares
import helmet from 'helmet';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

// Custom middlewares
import errorHandler from './errorHandler';
import requireLogin from './requireLogin';
import validate from './validate';

export {
  errorHandler,
  requireLogin,
  validate
}

export function preMiddlewares(app: Application) {
  app.use(helmet());
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
  app.use(express.json());
  app.use(morgan('tiny'));
}

export function postMiddlewares(app: Application) {
  app.use(errorHandler());
}
