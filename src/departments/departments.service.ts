import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class DepartmentsService {
  constructor(private readonly dbService: DbService){}
  async create(createDepartmentDto: CreateDepartmentDto) {
    return this.dbService.department.create({
      data: createDepartmentDto
    })
  }

  async findAll() {
    return this.dbService.department.findMany()
  }

  async findOne(id: number){
    const dep = await this.dbService.department.findUnique({
      where: {id}
    })
    if(!dep) throw new NotFoundException("Department does not exist.")
    return this.dbService.department.findUnique({
      where: {id}
    })
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const dep = await this.dbService.department.findUnique({
      where: {id}
    })
    if(!dep) throw new NotFoundException("This department does not exist.")
    if(updateDepartmentDto.name && updateDepartmentDto.name !== dep.name){
      const depExist = await this.dbService.department.findUnique({ 
        where: {name: updateDepartmentDto.name}
      })
      if(depExist) throw new ConflictException("Department already exists.")
    }
    return this.dbService.department.update({
      where: {id},
      data: updateDepartmentDto
    })
  }

  remove(id: number) {
    const dep = this.dbService.department.findUnique({
      where: {id}
    })
    if(!dep) throw new NotFoundException("Department doesnt exist.")
    return this.dbService.department.delete({
      where: {id}})
  }
}
