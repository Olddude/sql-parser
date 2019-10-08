import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';

import 'reflect-metadata';
import container from './container';

import { InversifyExpressServer } from 'inversify-express-utils';

import developmentConfig from './webapi.development.config.json';
import productionConfig from './webapi.production.config.json';

console.log('running on NODE_ENV %s', process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
  container.bind('APP_CONFIG').toConstantValue(productionConfig);
} else {
  container.bind('APP_CONFIG').toConstantValue(developmentConfig);
}

const config: any = container.get('APP_CONFIG');

const { protocol, host, rootPath } = config.api;

const API_ROOT = `${protocol}${host}${rootPath}`;

container.bind('API_ROOT').toConstantValue(API_ROOT);

const server = new InversifyExpressServer(container, null, { rootPath });
server.setConfig(_ => {
  _.use(bodyParser.urlencoded());
  _.use(bodyParser.json());
  _.use(cors({
    origin: '*',
    methods: 'OPTIONS,GET,POST',
    preflightContinue: false,
    optionsSuccessStatus: 200
  }));
  _.use(logger('combined'));
});

const app = server.build();

export default app;

// TODO https://codeforgeek.com/facebook-login-using-nodejs-express/
