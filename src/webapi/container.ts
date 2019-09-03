import { Container } from 'inversify';

// import controllers here
import './controllers/index.controller';
import './controllers/sql-astify.controller';

import { SqlParser } from '../services/sql-parser';
import { Logger } from '../services/logger';

const container = new Container();

// register services here
container.bind<Logger>('Logger').to(Logger);
container.bind<SqlParser>('SqlParser').to(SqlParser);

export default container;
