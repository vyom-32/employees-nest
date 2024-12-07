import {
  Table,
  Column,
  Model,
  HasMany,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Department } from './department.model';

@Table({
  tableName: 'Employees',
})
export class Employee extends Model<Employee> {
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

  @ForeignKey(() => Department)
  @Column({
    type: DataType.INTEGER,
  })
  department_id: number;

  @Column({
    type: DataType.DATEONLY,
  })
  dob: Date;

  @Column(DataType.STRING)
  phone: string;

  @Column(DataType.STRING)
  email: string;

  @Column(DataType.INTEGER)
  salary: number;

  @Column(DataType.STRING)
  photo: string;

  @Column({
    type: DataType.ENUM('Active', 'InActive'),
  })
  status: 'Active' | 'InActive';

  @CreatedAt
  created: Date;

  @UpdatedAt
  modified: Date;

  @BelongsTo(() => Department)
  department: Department;
}
