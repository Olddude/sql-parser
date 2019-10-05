import { Container } from 'inversify';

// import controllers here
import './controllers/index.controller';
import './controllers/sql-astify.controller';
import './controllers/messages.controller';

import { SqlParser } from '../services/sql-parser';
import { Logger } from '../services/logger';
import { HalMiddleware } from './middleware/hal.middleware';
import { MsSqlMessagesReader } from '../data-access/mssql-messages-reader';
import { MessagesProvider } from '../services/messages-provider';

const container = new Container();

// register services here
container.bind<Logger>('Logger').to(Logger);
container.bind<SqlParser>('SqlParser').to(SqlParser);
container.bind<HalMiddleware>('HalMiddleware').to(HalMiddleware);
container.bind<MsSqlMessagesReader>('MsSqlMessagesReader').to(MsSqlMessagesReader);
container.bind<MessagesProvider>('MessagesProvider').to(MessagesProvider);

export default container;
