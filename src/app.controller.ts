import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { EmployeeDTO } from './dtos/employee.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/create-employee')
  createEmployee(@Body() params: Partial<EmployeeDTO>) {
    return this.appService.createEmployee(params);
  }

  @Post('/employee-list')
  getEmployeeList(@Body() params: { skip: number; limit: number }) {
    return this.appService.getEmployeeList(params);
  }

  @Get('/employee-details/:id')
  getEmployeeDetails(@Param('id') id: number) {
    return this.appService.getEmployeeDetails(id);
  }

  @Post('/employee-count')
  getEmployeeCount() {
    return this.appService.getEmployeeCount();
  }

  @Post('/update-employee')
  updateEmployee(@Body() params: EmployeeDTO) {
    return this.appService.updateEmployee(params);
  }

  @Get('/statistics')
  getStatistics() {
    return this.appService.getStatistics();
  }

  @Get('/department-list')
  getDepartmentList() {
    return this.appService.getDepartmentList();
  }
}
