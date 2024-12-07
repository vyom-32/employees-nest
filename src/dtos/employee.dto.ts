import { DepartmentDTO } from './department.dto';

enum StatusEnum {
  Active = 'Active',
  InActive = 'InActive',
}

export class EmployeeDTO {
  id: number;
  department_id: number;
  name: number;
  dob: Date;
  phone: string;
  email: string;
  salary: number;
  photo: string;
  status: StatusEnum;
  created: Date;
  modified: Date;
  department: DepartmentDTO;
}
