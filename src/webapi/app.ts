import bodyParser from 'body-parser';
import logger from 'morgan';

import 'reflect-metadata';
import container from './container';

import { InversifyExpressServer } from 'inversify-express-utils';

import config from './webapi.config.json';

const { protocol, host, rootPath } = config;

const API_ROOT = `${protocol}${host}${rootPath}`;

container.bind('API_ROOT').toConstantValue(API_ROOT);

const server = new InversifyExpressServer(container, null, { rootPath });
server.setConfig(_ => {
  _.use(bodyParser.json());
  _.use(logger('combined'));
});

const app = server.build();

export default app;

// TODO https://codeforgeek.com/facebook-login-using-nodejs-express/
