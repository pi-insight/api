import express from 'express';
import dotenv from 'dotenv';

import {preMiddlewares, postMiddlewares} from './middlewares';
import registerRouters from './routes';

import { createConnection } from 'typeorm';

async function main() {
  dotenv.config();
  await createConnection();

  const server = express();

  preMiddlewares(server)
  registerRouters(server);
  postMiddlewares(server);

  const PORT = process.env.NODE_ENV === 'development' ? process.env.DEVELOPMENT_PORT : process.env.PRODUCTION_PORT;
  server.listen(PORT, () => {
    console.clear();
    console.log(`Server listening 🚀 [${PORT}]`);
  });
}

main();