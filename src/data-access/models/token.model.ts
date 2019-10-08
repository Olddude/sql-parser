import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model';

@Table({ timestamps: false })
export class Token extends Model<Token> {
  @Column({ primaryKey: true })
  guid: string;

  @Column
  active: boolean;

  @Column
  created: Date;

  @Column
  updated: Date;

  @Column
  expires: Date;

  @ForeignKey(() => User)
  @Column
  userId?: number;

  @BelongsTo(() => User)
  user?: User;
}
