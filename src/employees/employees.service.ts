import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly dbService: DbService){}
  create(createEmployeeDto: CreateEmployeeDto) {
    
    return this.dbService.employee.create({
      data: createEmployeeDto
    })
  }

  findAll() {
    return this.dbService.employee.findMany()
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
