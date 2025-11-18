import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { DbService } from 'src/db/db.service';
import { checkDepartmentExistence, checkEmployeeEmail, employeesFilter } from './employee.utils';
import { Employee, Role } from '@prisma/client';

@Injectable()
export class EmployeesService {
  constructor(private readonly dbService: DbService){}
  async create(createEmployeeDto: CreateEmployeeDto) {
    await checkDepartmentExistence(createEmployeeDto.departmentId, this.dbService)
    try{
      return await this.dbService.employee.create({
        data: {
          name: createEmployeeDto.name,
          email: createEmployeeDto.email,
          role:createEmployeeDto.role,
          department: {connect : {id: createEmployeeDto.departmentId}}
        }
      })
    }catch(error:any){
      if(error.code === "P2002" && error.meta?.target?.includes('email')){
        throw new ConflictException("Email already exists!")
      }
      throw error
    }
  }

  async findAll(role: Role, minSalary: number, maxSalary: number) {
    const employees  = await employeesFilter(this.dbService, role)
    return employees
  }

  async findOne(id: number) {
    const employee = await this.dbService.employee.findUnique({
      where: {id}
    })
    if(!employee) throw new NotFoundException("Employee does not exist.")
    return employee
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const emp = await this.dbService.employee.findUnique({where: {id}})
    const data : any = {...updateEmployeeDto}
    if(!emp) throw new BadRequestException("Employee does not exist.")
    if(data.departmentId && data.departmentId !== emp.departmentId){
      await checkDepartmentExistence(data.departmentId, this.dbService)
      delete data.departmentId
      data.department = {connect: {id: updateEmployeeDto.departmentId}}
    }
    if(updateEmployeeDto.newSalary && updateEmployeeDto.newSalary !== emp.currentSalary){
      delete data.newSalary
      await this.updateEmployeeSalary(id, emp, updateEmployeeDto.newSalary)
      data.currentSalary = updateEmployeeDto.newSalary
    }
    try{
      return await this.dbService.employee.update({
        where: {id},
        data
      })
    } catch(error) {
      if(error.code === "P2002" && error.meta?.target?.includes("email")){
        throw new ConflictException("Email already exists.")
      }
      throw error
    }
  }

  async remove(id: number) {
    return `This action removes a #${id} employee`;
  }

  async updateEmployeeSalary(id: number, emp: Employee, newSalary: number){
    return await this.dbService.salaryHistory.create({
      data: {
        oldSalary: emp.currentSalary,
        newSalary: newSalary,
        employee: {connect : {id}}
      }
    })
  }
}
