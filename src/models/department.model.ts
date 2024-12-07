import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'Departments',
})
export class Department extends Model<Department> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.ENUM('Active', 'InActive'),
  })
  status: 'Active' | 'InActive';

  @CreatedAt
  created: Date;

  @UpdatedAt
  modified: Date;
}
