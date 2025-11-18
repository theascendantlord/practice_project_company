import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { DbService } from 'src/db/db.service';
import { checkDepartmentExistence, checkEmployeeEmail, employeesFilter } from './employee.utils';
import { Role } from '@prisma/client';

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

  findOne(id: number) {
    const employee = this.dbService.employee.findUnique({
      where: {id}
    })
    if(!employee) throw new NotFoundException("Employee does not exist.")
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
