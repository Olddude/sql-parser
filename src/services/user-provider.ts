import { injectable, inject } from 'inversify';
import { MsSqlConnectionProvider } from '../data-access/connection/mssql-connection-provider';
import { User } from '../data-access/models/user.model';

@injectable()
export class UserProvider {

  @inject('MsSqlConnectionProvider')
  private readonly connectionProvider: MsSqlConnectionProvider;

  async data() {
    const connection = this.connectionProvider.connection();

    const result = await User.findAll();

    await connection.close();

    return result;
  }
}
