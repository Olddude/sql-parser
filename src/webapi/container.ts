import { Container } from 'inversify';

// import controllers here
import './controllers/index.controller';
import './controllers/sql-astify.controller';
import './controllers/token.controller';
import './controllers/user.controller';

import { SqlParser } from '../services/sql-parser';
import { Logger } from '../services/logger';
import { HalMiddleware } from './middleware/hal.middleware';
import { TokenProvider } from '../services/token-provider';
import { MsSqlConnectionProvider } from '../data-access/connection/mssql-connection-provider';
import { UserProvider } from '../services/user-provider';

const container = new Container();

// register services here
container.bind<Logger>(
  'Logger').to(Logger);

container.bind<SqlParser>(
  'SqlParser').to(SqlParser);

container.bind<HalMiddleware>(
  'HalMiddleware').to(HalMiddleware);

container.bind<MsSqlConnectionProvider>(
  'MsSqlConnectionProvider').to(MsSqlConnectionProvider);

container.bind<TokenProvider>(
  'TokenProvider').to(TokenProvider);

container.bind<UserProvider>(
  'UserProvider').to(UserProvider);

export default container;
