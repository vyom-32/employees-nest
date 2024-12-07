import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Get('/statistics')
  getStatistics() {
    return this.appService.getStatistics();
  }
}
