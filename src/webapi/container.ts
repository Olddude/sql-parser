import { Container } from 'inversify';

// import controllers here
import './controllers/index.controller';
import './controllers/sql-astify.controller';

import { SqlParser } from '../services/sql-parser';
import { Logger } from '../services/logger';
import { HalMiddleware } from './middleware/hal.middleware';

const container = new Container();

// register services here
container.bind<Logger>('Logger').to(Logger);
container.bind<SqlParser>('SqlParser').to(SqlParser);
container.bind<HalMiddleware>('HalMiddleware').to(HalMiddleware);

export default container;
