import { injectable, inject } from 'inversify';
import { MsSqlMessagesReader } from '../data-access/mssql-messages-reader';
import { Message } from '../business/message';

@injectable()
export class MessagesProvider {

  @inject('MsSqlMessagesReader')
  private reader: MsSqlMessagesReader;

  getMessages(): Promise<Message[]> {
    return this.reader.readMessages();
  }
}
