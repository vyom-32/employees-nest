import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from './db/database.service';
import { EmployeeDTO } from './dtos/employee.dto';
import { promises as fsPromises } from 'fs';
import * as path from 'path';
import { Express } from 'express';

@Injectable()
export class AppService {
  constructor(private db: DatabaseService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getEmployeeCount() {
    const result = await this.db.query(
      `SELECT COUNT(*) as count FROM Employees`,
    );
    return result[0].count;
  }
  async getEmployeeList(params: { skip: number; limit: number }) {
    console.log('getEmployeeList.params...', params);
    const result = await this.db.query(
      `SELECT 
          e.id,
          e.name AS name,
          d.name AS department_name,
          DATE_FORMAT(e.dob, '%Y-%m-%d') AS dob ,
          e.phone,
          e.email,
          e.salary,
          e.photo,
          e.status,
          e.created,
          e.modified
      FROM 
          Employees e
      LEFT JOIN 
          Departments d ON e.department_id = d.id
      LIMIT 
          ${params.limit} OFFSET ${params.skip}`,
    );
    return { data: result };
  }
  async createEmployee(params: Partial<EmployeeDTO>) {
    if (
      !params.name ||
      !params.dob ||
      !params.phone ||
      !params.email ||
      !params.salary ||
      !params.department_id
    ) {
      throw new HttpException(
        'Name, DOB, phone, email, department_id and salary are required.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.db.query(
      `INSERT INTO Employees (name, dob, phone, email, salary, status, department_id, photo) VALUES (?,?,?,?,?,?,?,?)`,
      [
        params.name,
        params.dob,
        params.phone,
        params.email,
        params.salary,
        'Active',
        params.department_id,
        params.photo || null,
      ],
    );
  }
  async updateEmployee(params: EmployeeDTO) {
    const { id } = params;
    const updateData: Partial<EmployeeDTO> = {};
    params.salary && (updateData.salary = params.salary);
    params.phone && (updateData.phone = params.phone);
    params.email && (updateData.email = params.email);
    params.status && (updateData.status = params.status);
    params.name && (updateData.name = params.name);
    params.dob && (updateData.dob = params.dob);
    params.department_id && (updateData.department_id = params.department_id);
    params.photo && (updateData.photo = params.photo);

    if (!id || Object.keys(updateData).length === 0) {
      throw new HttpException('Invalid Data', HttpStatus.BAD_REQUEST);
    }
    const keys = Object.keys(updateData);
    const values = Object.values(updateData);

    const setClause = keys.map((key) => `${key} = ?`).join(', ');

    const query = `UPDATE Employees SET ${setClause} WHERE id = ${id}`;
    return this.db.query(query, values);
  }
  async deleteEmployee(id: number) {
    if (!id) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    }
    const query = `DELETE FROM Employees WHERE id = ?`;
    return this.db.query(query, [id]);
  }
  async salaryRangeWiseCount() {
    const query = `
      SELECT 
        CASE 
          WHEN salary <= 50000 THEN '0-50000'
          WHEN salary > 50000 AND salary <= 100000 THEN '50001-100000'
          ELSE '100000+'
        END AS salary_range, COUNT(*) AS count
      FROM Employees
      GROUP BY salary_range
    `;
    const result = await this.db.query(query);
    return result.reduce(
      (acc, curr) => ({ ...acc, [curr.salary_range]: curr.count }),
      {},
    );
  }
  async departmentWiseHighestSalary() {
    const query = `
      SELECT d.name AS department, MAX(e.salary) AS highest_salary
      FROM Employees e
      JOIN Departments d ON e.department_id = d.id
      GROUP BY d.name
    `;
    return this.db.query(query);
  }
  async getDepartmentWiseYougestEmployees() {
    const query = `
     SELECT 
          d.name AS department_name,
          e.name,
          TIMESTAMPDIFF(YEAR, e.dob, NOW()) AS age
      FROM 
          Employees e
      INNER JOIN 
          Departments d
      ON 
          e.department_id = d.id
      WHERE 
          e.dob = (
              SELECT MAX(dob) 
              FROM Employees 
              WHERE department_id = e.department_id
          )
      ORDER BY 
          d.name;
    `;
    return this.db.query(query);
  }
  async getStatistics() {
    const result = {};
    result['rangeWiseCount'] = await this.salaryRangeWiseCount();
    result['departmentWiseHighestSalary'] =
      await this.departmentWiseHighestSalary();
    result['departmentWiseYougestEmployees'] =
      await this.getDepartmentWiseYougestEmployees();
    return result;
  }
  async getDepartmentList() {
    return this.db.query(
      `SELECT id, name FROM Departments WHERE status = 'Active'`,
    );
  }

  async getEmployeeDetails(id: number) {
    const result = await this.db.query(
      `SELECT 
          e.id,
          e.name AS name,
          d.name AS department_name,
          e.department_id,
          DATE_FORMAT(e.dob, '%Y-%m-%d') AS dob ,
          e.phone,
          e.email,
          e.salary,
          e.photo,
          e.status,
          e.created,
          e.modified
      FROM 
          Employees e
      LEFT JOIN 
          Departments d ON e.department_id = d.id
      WHERE e.id = ${id}`,
    );
    if (result.length) {
      return result[0];
    }
    throw new HttpException('Employee not found', HttpStatus.BAD_REQUEST);
  }
}
