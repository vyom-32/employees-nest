enum StatusEnum {
  Active = 'Active',
  InActive = 'InActive',
}

export class DepartmentDTO {
  id: number;
  name: number;
  status: StatusEnum;
  created: Date;
  modified: Date;
}
