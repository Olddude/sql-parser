import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Token } from './token.model';

@Table({ timestamps: false })
export class User extends Model<User> {
  @Column({ primaryKey: true })
  id: string;

  @Column
  email: string;

  @Column
  login: string;

  @Column
  password: string;

  @HasMany(() => Token, 'userId')
  tokens?: Token[];
}
