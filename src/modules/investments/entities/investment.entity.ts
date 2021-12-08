import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../../users/user.entity';

@Table
export class Investment extends Model<Investment> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  value: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  Date: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @Column({
    type: DataType.ENUM,
    values: ['RENDA_VARIAVEL', 'RENDA_FIXA'],
    allowNull: false,
  })
  type: string;
}
