import sql from 'mssql';
import { Message } from '../business/message';
import { inject, injectable } from 'inversify';
import { Config } from '../business/config';

@injectable()
export class MsSqlMessagesReader {

  private config: any;

  constructor(@inject('APP_CONFIG') private appConfig: Config) {
    this.config = {
      user: appConfig.db.user,
      password: process.env.DBPASS,
      server: appConfig.db.server,
      database: appConfig.db.database,
      options: {
        encrypt: true // Use this if you're on Windows Azure
      }
    };
  }

  async readMessages(): Promise<Message[]> {
    const connection = await new sql.ConnectionPool(this.config).connect();
    return connection
      .query('SELECT * FROM [Messages]')
      .then(_ => _.recordset.map(item => item as Message))
      .finally(() => connection.close());
  }

  writeMessages(...messages: string[]): Promise<void[]> {
    const promises = messages.map(async message => {
      const connection = await new sql.ConnectionPool(this.config).connect();
      const ps = new sql.PreparedStatement(connection);
      ps.input('message', sql.VarChar(4096));
      const query = `
        INSERT INTO [Messages] ([Value])
        VALUES(@message)
      `;
      ps.prepare(query, () => {
        ps.execute({ message }, (err, result) => {
          ps.unprepare(() => connection.close());
        });
      });
    });

    return Promise.all(promises);
  }
}
