import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';

import 'reflect-metadata';
import container from './container';

import { InversifyExpressServer } from 'inversify-express-utils';
import { Config } from '../business/config';

import fs from 'fs';
import path from 'path';

const configMap = {
  development: './webapi.development.config.json',
  production: './webapi.production.config.json'
};

const config: Config = JSON.parse(fs.readFileSync(
  path.resolve(__dirname, configMap[process.env.NODE_ENV]),
  { encoding: 'utf-8' }
));

console.log(config);

container.bind('APP_CONFIG').toConstantValue(config);

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
