import { Sequelize } from 'sequelize-typescript';
import { injectable, inject } from 'inversify';
import { Token } from '../models/token.model';
import { User } from '../models/user.model';

@injectable()
export class MsSqlConnectionProvider {

  @inject('APP_CONFIG')
  private readonly appConfig: any;

  connect() {
    const connection = new Sequelize({
      ...this.appConfig.db,
      models: [
        Token,
        User,
      ],
    });
    return connection;
  }
}
