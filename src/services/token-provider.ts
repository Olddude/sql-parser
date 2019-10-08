import { Token } from '../data-access/models/token.model';
import { injectable, inject } from 'inversify';
import { MsSqlConnectionProvider } from '../data-access/connection/mssql-connection-provider';

@injectable()
export class TokenProvider {

  @inject('MsSqlConnectionProvider')
  private readonly connectionProvider: MsSqlConnectionProvider;

  async data() {
    const connection = this.connectionProvider.connection();

    const result = await Token.findAll();

    await connection.close();

    return result;
  }
}
